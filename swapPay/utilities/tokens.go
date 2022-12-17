package utilities

import (
	"context"
	"log"
	"time"

	"github.com/davidAg9/swappay/constants"
	"github.com/davidAg9/swappay/database"
	"github.com/davidAg9/swappay/models"
	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var userdb = database.OpenCollection(database.Client, constants.UsersCollection)

func ValidateToken(signedToken string) (claims *models.SignedDetails, msg string) {
	token, err := jwt.ParseWithClaims(
		signedToken,
		&models.SignedDetails{},
		func(t *jwt.Token) (interface{}, error) {
			return []byte(constants.Secret_Key), nil
		},
	)

	if err != nil {
		msg = err.Error()
		return
	}
	claims, ok := token.Claims.(*models.SignedDetails)

	if !ok {
		msg = "token is invalid error:"
		msg += err.Error()
		return
	}
	currDate := &jwt.NumericDate{
		Time: time.Now().Local(),
	}

	if claims.ExpiresAt.Unix() < currDate.Unix() {
		msg = "token is expired  error:"
		msg += err.Error()
		return
	}

	return claims, msg
}

func GenerateAllTokens(email, firstname, lastname, userId, userType string) (signedToken, refreshToken string, err error) {
	claims := &models.SignedDetails{
		Email:      email,
		First_name: firstname,
		Last_name:  lastname,
		Uid:        userId,
		User_type:  userType,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: &jwt.NumericDate{
				Time: time.Now().Local().Add(time.Hour * time.Duration(24)),
			},
		},
	}

	refreshClaims := &models.SignedDetails{
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: &jwt.NumericDate{
				Time: time.Now().Local().Add(time.Hour * time.Duration(24)),
			},
		},
	}

	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(constants.Secret_Key))
	if err != nil {
		log.Panic(err)
		return
	}
	refreshTkn, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString([]byte(constants.Secret_Key))
	if err != nil {
		log.Panic(err)
		return
	}
	return token, refreshTkn, err
}

func UpdateAllTokens(token, refreshToken, userId string) {
	var ctx, cancel = context.WithTimeout(context.Background(), 60*time.Second)

	var updateObj primitive.D

	updateObj = append(updateObj, bson.E{Key: "token", Value: token})
	updateObj = append(updateObj, bson.E{Key: "refreshToken", Value: refreshToken})

	updated_At, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
	updateObj = append(updateObj, bson.E{Key: "updatedAt", Value: updated_At})

	upsert := false

	filter := bson.M{"user_id": userId}

	opts := options.UpdateOptions{
		Upsert: &upsert,
	}

	_, err := userdb.UpdateOne(ctx, filter, bson.D{
		{Key: "$set", Value: updateObj},
	}, &opts)

	defer cancel()

	if err != nil {
		log.Panic(err)
		return
	}

}
