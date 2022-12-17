package routes

import (
	"github.com/davidAg9/swappay/controllers"
	"github.com/davidAg9/swappay/middlewares"
	"github.com/gin-gonic/gin"
)

func PaymentsRoutes(incomingRoutes *gin.RouterGroup) {

	incomingRoutes.Use(middlewares.ApiKeyAuthentication())
	incomingRoutes.GET("/payments/hello", controllers.ApiHello())
	incomingRoutes.GET("/payments/", controllers.GetAllPayments())
	incomingRoutes.POST("/payments/refund", controllers.RefundPayment())
	incomingRoutes.GET("/payments/:transaction_id", controllers.GetPayment())
	incomingRoutes.Use(middlewares.AuthorizedDebit())
	incomingRoutes.POST("/payments/accept", controllers.AcceptPayments())

}
