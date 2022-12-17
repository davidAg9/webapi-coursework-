package utilities

import (
	"crypto/sha256"
	"fmt"
	"os"
	"strconv"

	rs "github.com/jmcvetta/randutil"

	"github.com/go-playground/validator/v10"
)

var ModelValidator = validator.New()

func iterativeDigitsCount(number int) int {
	count := 0
	for number != 0 {
		number /= 10
		count += 1
	}
	return count

}

func NumLen(fl validator.FieldLevel) bool {
	param, err := strconv.ParseInt(fl.Param(), 10, 64)
	if err != nil {
		return false
	}
	vl := fl.Field()
	if vl.IsZero() {
		return true
	}
	count := iterativeDigitsCount(int(vl.Int()))
	return int(param) == count
}

func GenerateApiKey() (*string, error) {
	hash, err := rs.AlphaString(32)
	if err != nil {
		return nil, err
	}
	crpt := sha256.New()
	crpt.Write([]byte(hash))

	key := fmt.Sprintf("%x", crpt.Sum([]byte(os.Getenv("SECRETECRYPTKEY"))))
	return &key, err

}
