package controllers

import (
	"context"
	"log"
	"net/http"
	"time"

	"github.com/davidAg9/swappay/constants"
	"github.com/davidAg9/swappay/database"
	"github.com/davidAg9/swappay/models"
	"github.com/davidAg9/swappay/utilities"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

var userCollection = database.OpenCollection(database.Client, constants.UsersCollection)

func Signup() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)
		defer cancel()
		var user models.User
		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		validerr := utilities.ModelValidator.Struct(user)

		if validerr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": validerr.Error()})
			return
		}

		count, err := userCollection.CountDocuments(ctx, bson.M{"email": user.Email})
		defer cancel()
		if err != nil {
			log.Panic(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Error while checking for email"})
			return
		}

		if count > 0 {
			c.JSON(http.StatusUnauthorized, gin.H{"error": "email already exist"})
			return
		}
		pass := utilities.HashPassword(*user.Password)
		user.Password = &pass
		user.Created_At, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		user.Updated_At = user.Created_At
		user.ID = primitive.NewObjectID()
		user.User_ID = user.ID.Hex()
		role := constants.UserRole
		user.UserType = &role
		tkns, refresh, _ := utilities.GenerateAllTokens(*user.Email, *user.FirstName, *user.LastName, user.User_ID, *user.UserType)

		user.Token = &tkns
		user.RefreshToken = &refresh

		res, insertErr := userCollection.InsertOne(ctx, user)
		if insertErr != nil {
			msg := "Could not create User"

			c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
			return
		}

		defer cancel()
		c.JSON(http.StatusOK, res)

	}
}

func Login() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("cache-control", "no-cache")
		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
		defer cancel()
		var user models.User
		var foundUser models.User

		if err := c.BindJSON(&user); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		err := userCollection.FindOne(ctx, bson.M{"email": user.Email}).Decode(&foundUser)
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Email or password is incorrect"})
			return
		}

		isPasswordValid, msg := utilities.VerifyPassword(*user.Password, *foundUser.Password)

		defer cancel()

		if !isPasswordValid {
			c.JSON(http.StatusBadRequest, gin.H{"error": msg})
			return
		}

		if foundUser.Email == nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "user not found"})
			return
		}

		token, refreshToken, _ := utilities.GenerateAllTokens(*foundUser.Email, *foundUser.FirstName, *foundUser.LastName, foundUser.User_ID, *foundUser.UserType)
		utilities.UpdateAllTokens(token, refreshToken, foundUser.User_ID)

		err = userCollection.FindOne(ctx, bson.M{"user_id": foundUser.User_ID}).Decode(&foundUser)

		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, foundUser)
	}
}

func GetUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Header("cache-control", "private,max-age=120")
		userId := c.Param("id")
		if err := utilities.MatchUserTypeToUid(c, userId); err != nil {
			log.Fatal(err)
			c.JSON(http.StatusBadRequest, err.Error())
			return
		}

		ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
		var user models.User

		err := userCollection.FindOne(ctx, bson.M{"user_id": userId}).Decode(&user)
		defer cancel()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}
		c.JSON(http.StatusOK, user)
	}
}

func UpdateUser() gin.HandlerFunc {
	return func(c *gin.Context) {}
}

func GenerateApiKey() gin.HandlerFunc {
	return func(c *gin.Context) {
		key, err := utilities.GenerateApiKey()
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not generate api key"})
			return
		}
		keydb := database.OpenCollection(database.Client, constants.KeysCollection)
		uid := c.GetString("uid")
		keydoc := models.KeyDoc{
			ID:  primitive.NewObjectID(),
			UID: uid,
			Key: *key,
		}
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*60)
		defer cancel()

		_, err = keydb.InsertOne(ctx, keydoc)
		if err != nil {

			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, key)

	}
}
