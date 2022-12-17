package constants

import "os"

const UsersCollection = "users"
const KeysCollection = "s_keys"
const AccountsCollection = "accounts"
const TransactionCollection = "transactions"

var Secret_Key = os.Getenv("SECRET_KEY")

const (
	AdminRole = "ADMIN"
	UserRole  = "USER"
)

const BankNo = "19231162022"
