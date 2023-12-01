package model

import (
	"database/sql"
	"fmt"
	"github.com/google/uuid"
)

type User struct {
	Id       string `db:"user_id" json:"user_id"`
	Username string `db:"username" json:"username"`
	Email    string `db:"email" json:"email"`
	Password *Password
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

	if err != nil {
		return nil, fmt.Errorf("failed get all users query: %s", err)
	}

	var users []User
	for rows.Next() {
		user := User{}
		if err := rows.Scan(&user.Id, &user.Username, &user.Email); err != nil {
			panic(err)
		}
		users = append(users, user)
	}

	return users, nil
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
