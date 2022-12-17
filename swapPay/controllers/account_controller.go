package controllers

import (
	"context"
	"fmt"
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
	"go.mongodb.org/mongo-driver/mongo/options"
)

var accDb = database.OpenCollection(database.Client, constants.AccountsCollection)

type Pin struct {
	Pincode string `json:"pincode" validate:"required,min=6,max=6"`
}

func CreateAccount() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)

		userId := c.GetString("uid")
		var account models.Account
		var pin Pin
		defer cancel()
		if err := c.BindJSON(&pin); err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "request body has incorrect keys "})
			return
		}
		count, err := accDb.CountDocuments(ctx, bson.M{"user_id": userId})
		if err != nil {
			log.Panic(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to communicated with db"})
			return
		}
		if count > 0 {
			c.JSON(http.StatusBadRequest, gin.H{"error": "account already exist"})
			return
		}

		acc_no, accErr := utilities.GenerateAccountNumber()
		if accErr != nil {
			log.Panic(accErr)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not create accoutn"})
			return
		}
		pincode := utilities.HashPassword(pin.Pincode)
		account.Account_ID = &acc_no
		account.ID = primitive.NewObjectID()
		account.User_ID = &userId
		account.Balance = 0.0
		account.Pin = &pincode
		account.Created_At, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		account.Updated_At, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))

		_, insertErr := accDb.InsertOne(ctx, account)
		if insertErr != nil {
			msg := "Could not create account"

			c.JSON(http.StatusInternalServerError, gin.H{"error": msg})
			return
		}

		c.JSON(http.StatusOK, account.Account_ID)

	}
}

///{amount:30}

func Deposit() gin.HandlerFunc {
	return func(c *gin.Context) {

		var payload struct {
			Amount float64 `json:"amount"`
		}
		err := c.BindJSON(&payload)

		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "payload badly formatted"})
			return
		}

		user_id := c.GetString("uid")

		filter := bson.M{"user_id": user_id}
		upsert := false

		opts := options.UpdateOptions{
			Upsert: &upsert,
		}

		var updateObj primitive.D
		updateObj = append(updateObj, bson.E{Key: "balance", Value: payload.Amount})
		var ctx, cancel = context.WithTimeout(context.Background(), 60*time.Second)
		defer cancel()
		_, err = accDb.UpdateOne(ctx, filter, bson.D{
			{Key: "$set", Value: updateObj},
		}, &opts)
		if err != nil {
			log.Fatalf("Deposit endpoint error >> %s\n", err.Error())
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not deposit amount , try again later"})
			return
		}
		message := fmt.Sprintf("You've deposited %f GHC successfully", payload.Amount)
		c.JSON(http.StatusOK, gin.H{"message": message})
	}
}

func Balance() gin.HandlerFunc {
	return func(c *gin.Context) {
		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
		userid := c.GetString("uid")
		var acc models.Account
		filter := bson.M{"user_id": userid}
		defer cancel()
		err := accDb.FindOne(ctx, filter).Decode(&acc)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, acc.Balance)

	}
}

func ResetPin() gin.HandlerFunc {
	return func(c *gin.Context) {

	}
}
