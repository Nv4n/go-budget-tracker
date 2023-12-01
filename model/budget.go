package model

type Budget struct {
	Category string  `db:"category" json:"category"`
	Amount   float64 `db:"amount" json:"amount"`
}
