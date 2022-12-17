package utilities

import (
	"errors"
	"log"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func CheckUserType(c *gin.Context, role string) (err error) {
	userType := c.GetString("userType")

	if userType != role {
		err = errors.New("unauthorized access to this resources")
		return err
	}

	return err
}

func MatchUserTypeToUid(c *gin.Context, userid string) (err error) {
	userType := c.GetString("userType")
	uid := c.GetString("uid")
	err = nil

	if userType == "USER" && userid != uid {
		err = errors.New("u nauthorized access to this resources")
		return err
	}

	err = CheckUserType(c, userType)
	return err
}

func VerifyPassword(providedPassword, userPassword string) (bool, string) {
	err := bcrypt.CompareHashAndPassword([]byte(userPassword), []byte(providedPassword))
	check := true
	msg := ""
	if err != nil {
		msg = "Password is incorrect"
		check = false
	}
	return check, msg
}

func HashPassword(password string) string {
	hashBytes, err := bcrypt.GenerateFromPassword([]byte(password), 14)
	if err != nil {
		log.Panic(err)
	}

	return string(hashBytes)
}
