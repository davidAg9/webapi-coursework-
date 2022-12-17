package controllers

import (
	"github.com/davidAg9/swappay/constants"
	"github.com/davidAg9/swappay/database"
	"github.com/gin-gonic/gin"
)

var transactionCollection = database.OpenCollection(database.Client, constants.TransactionCollection)

func GetTransactions() gin.HandlerFunc {
	return func(c *gin.Context) {

	}
}

func InstantPay() gin.HandlerFunc {
	return func(c *gin.Context) {

	}
}
