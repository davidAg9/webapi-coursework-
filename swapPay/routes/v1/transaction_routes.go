package routes

import (
	"github.com/davidAg9/swappay/controllers"
	"github.com/davidAg9/swappay/middlewares"
	"github.com/gin-gonic/gin"
)

func TransactionRoutes(incomingRoutes *gin.RouterGroup) {
	incomingRoutes.Use(middlewares.Authenticate())
	incomingRoutes.POST("/transactions/send", controllers.InstantPay())
	incomingRoutes.GET("/transactions/:user_id", controllers.GetTransactions())

}
