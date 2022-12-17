package controllers

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/davidAg9/swappay/database"
	"github.com/davidAg9/swappay/models"
	"github.com/davidAg9/swappay/utilities"
	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func AcceptPayments() gin.HandlerFunc {
	return func(c *gin.Context) {

		//get and validate transaction payload

		payloadAmount := c.GetFloat64("amount")
		payloadDebitAcct := c.GetInt("debit_acct")
		payloadReference := c.GetString("reference")
		payloadDetails := c.GetString("details")
		var details models.TransactionDetails

		err := json.Unmarshal([]byte(payloadDetails), &details)
		if err != nil {
			details = models.TransactionDetails{}
		}

		var txn models.Transaction = models.Transaction{
			Amount:        payloadAmount,
			Debit_Account: &payloadDebitAcct,
			Reference:     &payloadReference,
			Details:       details,
		}

		validerr := utilities.ModelValidator.Struct(txn)

		if validerr != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": validerr.Error()})
			return
		}

		//find credit account from api key

		var credit_acc int
		merchant_no := c.GetInt64("merchant_no")
		credit_acc = int(merchant_no)
		txn.Credit_Account = &credit_acc
		txn.ID = primitive.NewObjectID()
		txn.Transaction_ID = txn.ID.Hex()
		txn.Meta = models.TMeta{
			FromAPIGateWay: true,
			Refunded:       false,
		}

		txn.Created_At, _ = time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
		txn.Updated_At = txn.Created_At
		fmt.Println(*txn.Credit_Account)

		ctx, cancel := context.WithTimeout(context.Background(), time.Second*100)

		defer cancel()

		if err := database.Client.UseSession(ctx, func(sc mongo.SessionContext) error {

			err := sc.StartTransaction()
			if err != nil {
				return err
			}

			// subtract money from user account
			if err := performAmountDeduction(sc, txn.Amount, *txn.Debit_Account); err != nil {
				sc.AbortTransaction(sc)
				return err
			}
			// add money to credit account
			if err := performAmountAddition(sc, txn.Amount, *txn.Credit_Account); err != nil {
				sc.AbortTransaction(sc)
				return err
			}

			//save transaction

			saveTransaction(sc, &txn)
			if err != nil {
				sc.AbortTransaction(sc)
				return err
			}
			// return success or failure

			if err = sc.CommitTransaction(sc); err != nil {
				return err
			}

			return nil
		}); err != nil {
			log.Fatalln(err)
			c.JSON(http.StatusInternalServerError, gin.H{"error": "transaction failed"})
			return
		}

		c.JSON(http.StatusOK, txn)

	}
}

func RefundPayment() gin.HandlerFunc {
	return func(c *gin.Context) {
		transaction_id := c.PostForm("transaction_id")
		var transaction models.Transaction

		ctx, cancel := context.WithTimeout(context.Background(), 100*time.Second)

		defer cancel()
		filter := bson.M{"transaction_id": transaction_id}
		err := transactionCollection.FindOne(ctx, filter).Decode(&transaction)
		if err != nil {
			if err == mongo.ErrNoDocuments {
				c.JSON(http.StatusBadRequest, gin.H{"error": "transaction does not exist"})
				return
			}

			c.JSON(http.StatusInternalServerError, gin.H{"error": "operation failed"})
			return
		}

		if transaction.Meta.Refunded {
			c.JSON(http.StatusForbidden, gin.H{"error": "Payment has already been refunded"})
			return
		}

		if err = database.Client.UseSession(ctx, func(sc mongo.SessionContext) error {

			err := sc.StartTransaction()
			if err != nil {
				return err
			}

			err = performAmountDeduction(sc, transaction.Amount, *transaction.Credit_Account)
			if err != nil {
				sc.AbortTransaction(sc)
				return err
			}

			err = performAmountAddition(sc, transaction.Amount, *transaction.Debit_Account)
			if err != nil {
				sc.AbortTransaction(sc)
				return err
			}

			var updateObj bson.D

			updateAt, _ := time.Parse(time.RFC3339, time.Now().Format(time.RFC3339))
			updateObj = append(updateObj, bson.E{Key: "updated_at", Value: updateAt})
			updateObj = append(updateObj, bson.E{Key: "meta.refunded", Value: true})

			upsert := false
			opts := &options.UpdateOptions{Upsert: &upsert}
			_, err = transactionCollection.UpdateOne(sc, filter, bson.D{
				{Key: "$set", Value: updateObj},
			}, opts)
			if err != nil {
				sc.AbortTransaction(sc)
				return err
			}

			if err = sc.CommitTransaction(sc); err != nil {
				return err
			}
			return nil
		}); err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "Operation could not be completed"})
			return
		}

		c.JSON(http.StatusOK, gin.H{"message": "Refund successful"})

	}
}

func GetPayment() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Status(http.StatusAccepted)
	}
}
func GetAllPayments() gin.HandlerFunc {
	return func(c *gin.Context) {

	}
}

func ApiHello() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Status(http.StatusAccepted)
	}
}

func performAmountDeduction(ctx context.Context, amount float64, debit_acc int) error {
	filter := bson.M{"account_id": debit_acc}
	var account models.Account

	err := accDb.FindOne(ctx, filter).Decode(&account)
	if err != nil {
		return err
	}
	newBalance := account.Balance - amount
	upsert := false

	opts := options.UpdateOptions{
		Upsert: &upsert,
	}

	var updateObj primitive.D
	updateObj = append(updateObj, bson.E{Key: "balance", Value: newBalance})
	_, err = accDb.UpdateOne(ctx, filter, bson.D{
		{Key: "$set", Value: updateObj},
	}, &opts)
	if err != nil {

		return err
	}

	return nil
}

func performAmountAddition(ctx context.Context, amount float64, credit_acc int) error {
	filter := bson.M{"account_id": credit_acc}
	var account models.Account

	err := accDb.FindOne(ctx, filter).Decode(&account)
	if err != nil {
		return err
	}
	newBalance := account.Balance + amount
	upsert := false

	opts := options.UpdateOptions{
		Upsert: &upsert,
	}

	var updateObj primitive.D
	updateObj = append(updateObj, bson.E{Key: "balance", Value: newBalance})
	_, err = accDb.UpdateOne(ctx, filter, bson.D{
		{Key: "$set", Value: updateObj},
	}, &opts)
	if err != nil {

		return err
	}

	return nil
}

func saveTransaction(ctx context.Context, txn *models.Transaction) error {
	_, err := transactionCollection.InsertOne(ctx, txn)
	if err != nil {
		return err
	}

	return nil
}

// c.Redirect(http.StatusPermanentRedirect,"http://localhost:9000/api/v1/payments/accept")
