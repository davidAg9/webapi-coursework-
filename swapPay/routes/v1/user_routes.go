package routes

import (
	"github.com/davidAg9/swappay/controllers"
	"github.com/davidAg9/swappay/middlewares"
	"github.com/gin-gonic/gin"
)

func UserRoutes(incomingRoutes *gin.RouterGroup) {
	incomingRoutes.POST("/users/signup", controllers.Signup())
	incomingRoutes.POST("/users/login", controllers.Login())
	incomingRoutes.Use(middlewares.Authenticate())

	incomingRoutes.GET("/users/:id", controllers.GetUser())
	incomingRoutes.PUT("/users/update/:id", controllers.UpdateUser())
	incomingRoutes.POST("/users/api/key/", controllers.GenerateApiKey())

}
