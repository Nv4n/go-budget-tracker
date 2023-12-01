package model

import "time"

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
