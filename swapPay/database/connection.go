package database

import (
	"context"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var Client *mongo.Client = DbInstance()

func DbInstance() *mongo.Client {
	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}
	MongoDb := os.Getenv("MONGODB_URL")

	ctx, cancel := context.WithTimeout(context.Background(), 20*time.Second)
	defer cancel()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI(MongoDb))
	if err != nil {
		log.Fatalf("Error connecting mongodb %s", err)
	}

	fmt.Println("Connected to MongoDb")

	return client
}

func OpenCollection(forClient *mongo.Client, collectionName string) *mongo.Collection {
	var collection *mongo.Collection = forClient.Database("swapbank").Collection(collectionName)

	return collection
}
