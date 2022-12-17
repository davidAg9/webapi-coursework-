package models

import (
	"time"

	"github.com/golang-jwt/jwt/v4"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type User struct {
	ID           primitive.ObjectID `bson:"_id"`
	User_ID      string             `json:"user_id"`
	UserType     *string            `json:"userType"`
	FirstName    *string            `json:"firstName" validate:"required,min=3,max=30"`
	LastName     *string            `json:"lastName" validate:"required,min=3,max=30"`
	Email        *string            `json:"email" validate:"email,required"`
	Password     *string            `json:"password" validate:"required,min=6"`
	Token        *string            `json:"token" `
	RefreshToken *string            `json:"refreshToken"`
	Created_At   time.Time          `json:"createdAt"`
	Updated_At   time.Time          `json:"updatedAt"`
}

type Account struct {
	ID         primitive.ObjectID `bson:"_id"`
	User_ID    *string            `json:"user_id" validate:"required"`
	Account_ID *int64             `json:"account_id" validate:"required ,numlen=17"`
	Balance    float64            `json:"balance" validate:"required" `
	Created_At time.Time          `json:"createdAt"`
	Updated_At time.Time          `json:"updatedAt"`
	Pin        *string            `json:"pincode"`
}

type Transaction struct {
	ID             primitive.ObjectID `bson:"_id"`
	Transaction_ID string             `json:"transaction_id" `
	Amount         float64            `json:"amount" validate:"required"`
	Debit_Account  *int               `json:"debit_acct" bson:"debit_acct"  validate:"required,numlen=17"`
	Credit_Account *int               `json:"credit_acct" bson:"credit_acct" validate:"numlen=17"`
	Reference      *string            `json:"reference"`
	Created_At     time.Time          `json:"createdAt" bson:"created_at"`
	Updated_At     time.Time          `json:"updatedAt" bson:"updated_at"`
	Details        TransactionDetails `json:"details"`
	Meta           TMeta              `json:"metadata" bson:"meta"`
}

type SignedDetails struct {
	Email      string
	First_name string
	Last_name  string
	Uid        string
	User_type  string
	jwt.RegisteredClaims
}

type TMeta struct {
	FromAPIGateWay bool `json:"fag" `
	Refunded       bool `json:"refunded"`
	// pincode *string
}

type TransactionDetails struct {
}

// type Payable interface {
// 	PerformAmountDeduction(ctx context.Context) error
// 	PerformAmountAddition(ctx context.Context) error
// }

// func (txt *Transaction) PerformAmountDeduction(ctx context.Context) error {
// 	return nil
// }

// func PerformAmountAddition(ctx context.Context) error {
// 	return nil
// }

type KeyDoc struct {
	ID  primitive.ObjectID `bson:"_id"`
	UID string             `json:"uid"`
	Key string             `json:"key" bson:"sk"`
}

type AcceptPaymentData struct {
	Pin string      `json:"pn"`
	Txn Transaction `json:"txn"`
}
