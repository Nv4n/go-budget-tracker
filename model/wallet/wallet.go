package wallet

import (
	"github.com/Nv4n/go-budget-tracker/model/user"
	"time"
)

type Wallet struct {
	Name      string    `db:"wallet_name" json:"wallet_name"`
	Balance   float64   `db:"balance" json:"balance"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	User      *user.User
}

type TransactionType int

const (
	INCOME TransactionType = iota
	EXPENSE
)

type Transaction struct {
	Amount          float64         `db:"amount" json:"amount"`
	TransactionType TransactionType `db:"transaction_type" json:"transaction_type"`
	Description     string          `db:"description" json:"description"`
	TransactionDate time.Time       `db:"transaction_date" json:"transaction_date"`
	Wallet          *Wallet
}
