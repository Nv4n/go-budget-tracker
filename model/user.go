package model

import (
	"database/sql"
	"fmt"
	"github.com/doug-martin/goqu/v9"
	_ "github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type User struct {
	Id       string `db:"user_id" json:"user_id" validate:"uuid4""`
	Username string `db:"username" json:"username"`
	Email    string `db:"email" json:"email"`
}

type Password struct {
	UserId       string `db:"user_id" json:"user_id"`
	PasswordHash string `db:"password_hash" json:"password_hash"`
}

func GetAllUsers() ([]User, error) {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return nil, fmt.Errorf("error starting transaction: %s", err)
	}

	var rows *sql.Rows
	err = tx.Wrap(func() error {
		userQuery := tx.From("public.users").
			Select("user_id", "username", "email").Executor()
		r, eErr := userQuery.Query()
		rows = r
		return eErr
	})
	defer rows.Close()

	if err != nil {
		return nil, fmt.Errorf("failed get all users query: %s", err)
	}

	var users []User
	for rows.Next() {
		user := User{}
		if err = rows.Scan(&user.Id, &user.Username, &user.Email); err != nil {
			return nil, err
		}
		users = append(users, user)
	}
	if err = rows.Err(); err != nil {
		return nil, err
	}
	fmt.Println("Got all users successfully")
	return users, nil
}

func GetUserById(id string) (User, error) {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return User{}, fmt.Errorf("error starting transaction: %s", err)
	}

	var rows *sql.Rows
	err = tx.Wrap(func() error {
		userQuery := tx.From("public.users").
			Select("user_id", "username", "email").
			Where(goqu.C("user_id").Eq(id)).
			Limit(1).
			Executor()
		r, eErr := userQuery.Query()
		rows = r
		return eErr
	})
	defer rows.Close()

	if err != nil {
		return User{}, fmt.Errorf("failed get user by id query: %s", err)
	}

	var user User
	for rows.Next() {
		if err := rows.Scan(&user.Id, &user.Username, &user.Email); err != nil {
			return User{}, err
		}
	}
	if err = rows.Err(); err != nil {
		return User{}, err
	}
	fmt.Printf("Got user{ %s } successfully", id)
	return user, nil
}

func InsertUser(u User, passwordHash string) error {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %s", err)
	}

	userUUID := uuid.New().String()
	queryUser := tx.Insert("public.users").Rows(
		User{Id: userUUID, Username: u.Username, Email: u.Email}).Executor()

	queryPassword := tx.Insert("public.passwords").Rows(
		Password{userUUID, passwordHash}).Executor()

	if _, err = queryUser.Exec(); err != nil {
		if rErr := tx.Rollback(); rErr != nil {
			return fmt.Errorf("rollback failed: %s", rErr)
		}
		return fmt.Errorf("user query failed: %s", err)
	}
	if _, err = queryPassword.Exec(); err != nil {
		if rErr := tx.Rollback(); rErr != nil {
			return fmt.Errorf("rollback failed: %s", rErr)
		}
		return fmt.Errorf("password query failed: %s", err)
	}

	if err = tx.Commit(); err != nil {
		return fmt.Errorf("failed transaction: %s", err)
	}

	fmt.Println("User created successfully")
	return nil
}

func UpdateUser(u User) error {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %s", err)
	}

	err = tx.Wrap(func() error {
		userQuery := tx.From("public.users").
			Update().Set(u).Where(goqu.C("user_id").Eq(u.Id)).
			Executor()
		_, eErr := userQuery.Exec()
		return eErr
	})

	fmt.Println("User updated successfully")
	return nil
}

func DeleteUser(id string) error {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %s", err)
	}

	err = tx.Wrap(func() error {
		userQuery := tx.From("public.wallets").
			Delete().Where(goqu.C("user_id").Eq(id)).
			Executor()
		_, eErr := userQuery.Exec()
		return eErr
	})

	fmt.Printf("User{ %s } deleted successfully", id)
	return nil
}

func UpdatePassword(id string, passwordHash string) error {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return fmt.Errorf("error starting transaction: %s", err)
	}

	err = tx.Wrap(func() error {
		userQuery := tx.From("public.passwords").
			Update().Set(goqu.Record{"password_hash": passwordHash}).Where(goqu.C("user_id").Eq(id)).
			Executor()
		_, eErr := userQuery.Exec()
		return eErr
	})

	fmt.Println("User updated successfully")
	return nil
}
