package model

import (
	"database/sql"
	"fmt"
	"github.com/doug-martin/goqu/v9"
	"github.com/google/uuid"
	"time"
)

type Wallet struct {
	Id        string    `db:"wallet_id" json:"wallet_id" goqu:"defaultifempty"`
	UserId    string    `db:"user_id" json:"user_id" goqu:"omitempty"`
	Name      string    `db:"wallet_name" json:"wallet_name"`
	Balance   float64   `db:"balance" json:"balance"`
	CreatedAt time.Time `db:"created_at" json:"created_at"`
}

func GetAllWallets() ([]Wallet, error) {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return nil, fmt.Errorf("error starting transaction: %s", err)
	}

	var rows *sql.Rows
	err = tx.Wrap(func() error {
		walletQuery := tx.From("public.wallets").
			Select("wallet_id", "user_id", "wallet_name", "balance").Executor()
		r, eErr := walletQuery.Query()
		rows = r
		return eErr
	})
	defer rows.Close()

	if err != nil {
		return nil, fmt.Errorf("failed get all wallets query: %s", err)
	}

	var wallets []Wallet
	for rows.Next() {
		wallet := Wallet{}
		if err = rows.Scan(&wallet.Id, &wallet.UserId, &wallet.Name, &wallet.Balance); err != nil {
			return nil, err
		}
		wallets = append(wallets, wallet)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	fmt.Println("Got all wallets successfully")
	return wallets, nil
}

func GetWalletById(id string) (Wallet, error) {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return Wallet{}, fmt.Errorf("error starting transaction: %s", err)
	}

	var rows *sql.Rows
	err = tx.Wrap(func() error {
		walletQuery := tx.From("public.wallets").
			Select("wallet_id", "user_id", "wallet_name", "balance").
			Where(goqu.C("wallet_id").Eq(id)).Limit(1).
			Executor()
		r, eErr := walletQuery.Query()
		rows = r
		return eErr
	})
	defer rows.Close()

	if err != nil {
		return Wallet{}, fmt.Errorf("failed wallet by id query: %s", err)
	}

	var wallet Wallet
	for rows.Next() {
		if err = rows.Scan(&wallet.Id, &wallet.UserId, &wallet.Name, &wallet.Balance); err != nil {
			return Wallet{}, err
		}
	}
	if err = rows.Err(); err != nil {
		return Wallet{}, err
	}
	fmt.Printf("Got wallet{ %s } successfully", wallet.Id)
	return wallet, nil
}

func InsertWallet(w Wallet, userId string) error {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %s", err)
	}

	walletUUID := uuid.New().String()

	err = tx.Wrap(func() error {
		walletQuery := tx.Insert("public.wallets").
			Rows(Wallet{walletUUID, userId, w.Name, w.Balance, time.Now()}).
			Executor()
		_, eErr := walletQuery.Exec()
		return eErr
	})
	if err == nil {
		fmt.Println("Wallet created successfully")
	}
	return err
}

func UpdateWallet(w Wallet) error {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %s", err)
	}

	err = tx.Wrap(func() error {
		walletQuery := tx.From("public.wallets").
			Update().Set(w).Where(goqu.C("wallet_id").Eq(w.Id)).
			Executor()
		_, eErr := walletQuery.Exec()
		return eErr
	})

	fmt.Println("Wallet updated successfully")
	return nil
}

func DeleteWallet(id string) error {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %s", err)
	}

	err = tx.Wrap(func() error {
		walletQuery := tx.From("public.wallets").
			Delete().Where(goqu.C("wallet_id").Eq(id)).
			Executor()
		_, eErr := walletQuery.Exec()
		return eErr
	})

	fmt.Printf("Wallet{ %s } deleted successfully", id)
	return err
}
