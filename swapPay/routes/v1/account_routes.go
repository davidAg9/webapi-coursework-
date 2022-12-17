package routes

import (
	"github.com/davidAg9/swappay/controllers"
	"github.com/davidAg9/swappay/middlewares"
	"github.com/gin-gonic/gin"
)

func AccountRoutes(incomingRoutes *gin.RouterGroup) {
	incomingRoutes.Use(middlewares.Authenticate())
	incomingRoutes.POST("/accounts/create", controllers.CreateAccount())
	incomingRoutes.POST("/accounts/deposit", controllers.Deposit())
	incomingRoutes.GET("/accounts/balance", controllers.Balance())
	incomingRoutes.POST("/accounts/resetpin", controllers.ResetPin())

}
