package main

import (
	"log"
	"os"

	"github.com/davidAg9/swappay/routes/v1"
	"github.com/davidAg9/swappay/utilities"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	port := os.Getenv("PORT")

	if port == "" {
		port = "8000"
	}
	err = utilities.ModelValidator.RegisterValidation("numlen", utilities.NumLen, true)
	if err != nil {
		log.Fatal("Failed to register validator")
	}
	router := gin.New()

	router.Use(gin.Logger())

	v1a := router.Group("/api/v1")
	{
		v1a.GET("/hello", func(ctx *gin.Context) {

			ctx.JSON(200, gin.H{"success": "Access Granted for version 1"})

		})
		routes.UserRoutes(v1a)
		routes.AccountRoutes(v1a)
		routes.TransactionRoutes(v1a)
	}

	v1p := router.Group("/api/v1")
	{
		routes.PaymentsRoutes(v1p)
	}

	router.Run(":" + port)

}
