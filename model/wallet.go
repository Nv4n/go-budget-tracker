package model

import (
	"time"
)

type Wallet struct {
	Name      string    `db:"wallet_name" json:"wallet_name"`
	Balance   float64   `db:"balance" json:"balance"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
	User      *User
}
