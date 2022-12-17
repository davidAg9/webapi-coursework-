package middlewares

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/davidAg9/swappay/constants"
	"github.com/davidAg9/swappay/database"
	"github.com/davidAg9/swappay/models"
	"github.com/davidAg9/swappay/utilities"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
)

func Authenticate() gin.HandlerFunc {
	return func(c *gin.Context) {
		clientToken := c.Request.Header.Get("token")
		if clientToken == "" {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "No Authorization header provided"})
			c.Abort()
			return
		}

		claims, err := utilities.ValidateToken(clientToken)
		if err != "" {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err})
			c.Abort()
			return
		}
		c.Set("email", claims.Email)
		c.Set("first_name", claims.First_name)
		c.Set("last_name", claims.Last_name)
		c.Set("userType", claims.User_type)
		c.Set("uid", claims.Uid)
		c.Next()
	}
}

func ApiKeyAuthentication() gin.HandlerFunc {
	return func(c *gin.Context) {

		key := c.GetHeader("X-Swap-Key")
		keydb := database.OpenCollection(database.Client, constants.KeysCollection)
		accdb := database.OpenCollection(database.Client, constants.AccountsCollection)
		ctx, cancel := context.WithTimeout(context.Background(), time.Second*90)
		filter := bson.M{"sk": key}
		defer cancel()
		count, err := keydb.CountDocuments(ctx, filter)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Could not validate api key ,try again"})
			c.Abort()
			return
		}
		if count <= 0 {
			c.AbortWithStatus(http.StatusUnauthorized)
			return
		}
		var keydoc models.KeyDoc
		err = keydb.FindOne(ctx, filter).Decode(&keydoc)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "something went wrong"})
			c.Abort()
		}

		var doc struct {
			MerchantNo int64 `bson:"account_id" json:"account_id"`
		}

		err = accdb.FindOne(ctx, bson.M{"user_id": keydoc.UID}).Decode(&doc)
		if err != nil {
			fmt.Println(err.Error())
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": "something went wrong"})
			return
		}

		c.Set("merchant_no", doc.MerchantNo)
		c.Next()
	}
}

func AuthorizedDebit() gin.HandlerFunc {
	return func(c *gin.Context) {

		var accountsCollection = database.OpenCollection(database.Client, constants.AccountsCollection)
		// get permission to deduct money
		var payload models.AcceptPaymentData

		err := c.BindJSON(&payload)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "payload badly formatted"})
			return
		}

		var acc models.Account
		ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
		defer cancel()
		if err := accountsCollection.FindOne(ctx, bson.M{"account_id": *payload.Txn.Debit_Account}).Decode(&acc); err != nil {

			c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{"error": "account does not exist"})
			return
		}
		// authenticate account password

		isPinValid, _ := utilities.VerifyPassword(payload.Pin, *acc.Pin)
		if !isPinValid {
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		// check account balance is enough
		if payload.Txn.Amount > acc.Balance {
			c.JSON(http.StatusForbidden, gin.H{"error": "insufficient balance"})
			c.Abort()
		}

		strjson, err := json.Marshal(payload.Txn.Details)
		if err != nil {
			strjson = []byte("{}")
		}

		c.Set("merchant_no", c.GetInt64("merchant_no"))
		c.Set("debit_acct", *payload.Txn.Debit_Account)
		c.Set("amount", payload.Txn.Amount)
		c.Set("reference", *payload.Txn.Reference)
		c.Set("details", string(strjson))
		c.Next()

	}
}
