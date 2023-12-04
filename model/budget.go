package model

import (
	"database/sql"
	"fmt"
	"github.com/doug-martin/goqu/v9"
	"github.com/google/uuid"
)

type Budget struct {
	Id       string  `db:"budget_id" json:"budget_id"`
	UserId   string  `db:"user_id" json:"user_id"`
	Category string  `db:"category" json:"category"`
	Amount   float64 `db:"amount" json:"amount"`
}

func GetAllBudgets() ([]Budget, error) {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return nil, fmt.Errorf("error starting transaction: %s", err)
	}

	var rows *sql.Rows
	err = tx.Wrap(func() error {
		transactionQuery := tx.From("public.budgets").Select().Executor()
		r, eErr := transactionQuery.Query()
		rows = r
		return eErr
	})
	defer rows.Close()

	if err != nil {
		return nil, fmt.Errorf("failed get all budgets query: %s", err)
	}

	var budgets []Budget
	for rows.Next() {
		budget := Budget{}
		if err = rows.Scan(&budget.Id, &budget.UserId, &budget.Category, &budget.Amount, &budget.Category); err != nil {
			return nil, err
		}
		budgets = append(budgets, budget)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	fmt.Println("Got all budgets successfully")
	return budgets, nil
}

func GetBudgetById(id string) (Budget, error) {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return Budget{}, fmt.Errorf("error starting budget: %s", err)
	}

	var rows *sql.Rows
	err = tx.Wrap(func() error {
		transactionQuery := tx.From("public.budgets").
			Select().Where(goqu.C("budget_id").Eq(id)).Limit(1).
			Executor()
		r, eErr := transactionQuery.Query()
		rows = r
		return eErr
	})
	defer rows.Close()

	if err != nil {
		return Budget{}, fmt.Errorf("failed budget by id query: %s", err)
	}

	var budget Budget
	for rows.Next() {
		if err = rows.Scan(&budget.Id, &budget.UserId, &budget.Category, &budget.Amount, &budget.Category); err != nil {
			return Budget{}, err
		}
	}
	if err = rows.Err(); err != nil {
		return Budget{}, err
	}
	fmt.Printf("Got budget{ %s } successfully", id)
	return budget, nil
}

func InsertBudget(b Budget, userId string) error {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %s", err)
	}

	budgetUUID := uuid.New().String()

	err = tx.Wrap(func() error {
		budgetQuery := tx.Insert("public.budgets").
			Rows(Budget{budgetUUID, userId, b.Category, b.Amount}).
			Executor()
		_, eErr := budgetQuery.Exec()
		return eErr
	})
	if err == nil {
		fmt.Println("Budget created successfully")
	}
	return err
}

func UpdateBudget(b Budget) error {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %s", err)
	}

	err = tx.Wrap(func() error {
		transactionQuery := tx.From("public.budget").
			Update().Set(b).Where(goqu.C("budget_id").Eq(b.Id)).
			Executor()
		_, eErr := transactionQuery.Exec()
		return eErr
	})

	fmt.Println("Budget updated successfully")
	return err
}

func DeleteBudget(id string) error {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %s", err)
	}

	err = tx.Wrap(func() error {
		transactionQuery := tx.From("public.budgets").
			Delete().Where(goqu.C("budget_id").Eq(id)).
			Executor()
		_, eErr := transactionQuery.Exec()
		return eErr
	})

	fmt.Printf("Budget{ %s } deleted successfully", id)
	return nil
}
