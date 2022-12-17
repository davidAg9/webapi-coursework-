package utilities

import (
	"context"
	"fmt"
	"math/rand"
	"strconv"
	"time"

	"github.com/davidAg9/swappay/constants"
	"github.com/davidAg9/swappay/database"
	"go.mongodb.org/mongo-driver/bson"
)

//swapunicode = 19231162022000001;

var accountDb = database.OpenCollection(database.Client, constants.AccountsCollection)

func GenerateAccountNumber() (int64, error) {

	var newAcc_number int64
	min := 1
	max := 199999

	var err error
	retryCount := 3
	for i := 0; i <= retryCount; i++ {
		fmt.Println("started generation")

		rand.Seed(time.Now().UnixNano())
		gen_number := rand.Intn(max-min+1) + min

		if iterativeDigitsCount(gen_number) == 1 {
			newAcc_number, _ = strconv.ParseInt(constants.BankNo+"00000"+fmt.Sprint(gen_number), 10, 64)
			fmt.Println(newAcc_number)

		} else if iterativeDigitsCount(gen_number) == 2 {
			newAcc_number, _ = strconv.ParseInt(constants.BankNo+"0000"+fmt.Sprint(gen_number), 10, 64)
			fmt.Println(newAcc_number)

		} else if iterativeDigitsCount(gen_number) == 3 {
			newAcc_number, _ = strconv.ParseInt(constants.BankNo+"000"+fmt.Sprint(gen_number), 10, 64)
			fmt.Println(newAcc_number)

		} else if iterativeDigitsCount(gen_number) == 4 {
			newAcc_number, _ = strconv.ParseInt(constants.BankNo+"00"+fmt.Sprint(gen_number), 10, 64)
			fmt.Println(newAcc_number)

		} else if iterativeDigitsCount(gen_number) == 5 {
			newAcc_number, _ = strconv.ParseInt(constants.BankNo+"0"+fmt.Sprint(gen_number), 10, 64)
			fmt.Println(newAcc_number)

		} else {
			newAcc_number, _ = strconv.ParseInt(constants.BankNo+fmt.Sprint(gen_number), 10, 64)
			fmt.Println(newAcc_number)

		}

		ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
		defer cancel()
		filter := bson.M{"account_id": newAcc_number}
		count, countErr := accountDb.CountDocuments(ctx, filter)
		if count <= 0 {
			break
		}

		if countErr != nil {
			err = countErr
			continue
		}
		break

	}

	return newAcc_number, err
}
