package model

import (
	"database/sql"
	"fmt"
	"github.com/doug-martin/goqu/v9"
	"github.com/google/uuid"
	"time"
)

type TransactionType int

const (
	INCOME TransactionType = iota
	EXPENSE
)

type Transaction struct {
	Id              string          `db:"transaction_id" json:"transaction_id" goqu:"defaultifempty"`
	WalletId        string          `db:"wallet_id" json:"walled_id"`
	Amount          float64         `db:"amount" json:"amount"`
	TransactionType TransactionType `db:"transaction_type" json:"transaction_type"`
	Category        string          `db:"category" json:"category"`
	Description     string          `db:"description" json:"description"`
	TransactionDate time.Time       `db:"transaction_date" json:"transaction_date"`
}

func GetAllTransactions() ([]Transaction, error) {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return nil, fmt.Errorf("error starting transaction: %s", err)
	}

	var rows *sql.Rows
	err = tx.Wrap(func() error {
		transactionQuery := tx.From("public.transactions").Select().Executor()
		r, eErr := transactionQuery.Query()
		rows = r
		return eErr
	})
	defer rows.Close()

	if err != nil {
		return nil, fmt.Errorf("failed get all transactions query: %s", err)
	}

	var transactions []Transaction
	for rows.Next() {
		transaction := Transaction{}
		if err = rows.Scan(&transaction.Id, &transaction.WalletId, &transaction.Amount,
			&transaction.TransactionType, &transaction.Category, &transaction.Description,
			&transaction.TransactionDate); err != nil {
			return nil, err
		}
		transactions = append(transactions, transaction)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	fmt.Println("Got all transactions successfully")
	return transactions, nil
}

func GetTransactionById(id string) (Transaction, error) {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return Transaction{}, fmt.Errorf("error starting transaction: %s", err)
	}

	var rows *sql.Rows
	err = tx.Wrap(func() error {
		transactionQuery := tx.From("public.transactions").
			Select().Where(goqu.C("transaction_id").Eq(id)).Limit(1).
			Executor()
		r, eErr := transactionQuery.Query()
		rows = r
		return eErr
	})
	defer rows.Close()

	if err != nil {
		return Transaction{}, fmt.Errorf("failed transaction by id query: %s", err)
	}

	var transaction Transaction
	for rows.Next() {
		if err = rows.Scan(&transaction.Id, &transaction.WalletId, &transaction.Amount,
			&transaction.TransactionType, &transaction.Category, &transaction.Description,
			&transaction.TransactionDate); err != nil {
			return Transaction{}, err
		}
	}
	if err = rows.Err(); err != nil {
		return Transaction{}, err
	}
	fmt.Printf("Got transaction{ %s } successfully", id)
	return transaction, nil
}

func InsertTransaction(t Transaction, walletId string) error {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %s", err)
	}

	transactionUUID := uuid.New().String()

	err = tx.Wrap(func() error {
		transactionQuery := tx.Insert("public.transactions").
			Rows(Transaction{transactionUUID, walletId, t.Amount,
				t.TransactionType, t.Category,
				t.Description, t.TransactionDate}).
			Executor()
		_, eErr := transactionQuery.Exec()
		return eErr
	})
	if err == nil {
		fmt.Println("Transaction created successfully")
	}
	return err
}

func UpdateTransaction(t Transaction) error {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %s", err)
	}

	err = tx.Wrap(func() error {
		transactionQuery := tx.From("public.transactions").
			Update().Set(t).Where(goqu.C("transaction_id").Eq(t.Id)).
			Executor()
		_, eErr := transactionQuery.Exec()
		return eErr
	})

	fmt.Println("Transaction updated successfully")
	return err
}

func DeleteTransaction(id string) error {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %s", err)
	}

	err = tx.Wrap(func() error {
		transactionQuery := tx.From("public.transactions").
			Delete().Where(goqu.C("transaction_id").Eq(id)).
			Executor()
		_, eErr := transactionQuery.Exec()
		return eErr
	})

	fmt.Printf("Transaction{ %s } deleted successfully", id)
	return nil
}
