package model

import (
	"database/sql"
	"fmt"
	"github.com/doug-martin/goqu/v9"
	_ "github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"log"
)

type UserAuthRegisterDto struct {
	Username   string `validate:"required,email" json:"username"`
	Email      string `validate:"required" json:"email"`
	Password   string `validate:"required,min=8,max=32,password" json:"password"`
	Repassword string `validate:"required,eqfield=Password" json:"repassword"`
}
type UserAuthLoginDto struct {
	Username string `validate:"required,email" json:"username"`
	Password string `validate:"required,min=8,max=32,password" json:"password"`
}

type User struct {
	Id       string `db:"user_id" json:"user_id" validate:"uuid4" goqu:"defaultifempty"`
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

func GetUserAuth(u UserAuthLoginDto) (User, error) {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return User{}, fmt.Errorf("error starting transaction: %s", err)
	}

	var rows *sql.Rows
	err = tx.Wrap(func() error {
		userQuery := tx.From("public.users").
			Select("users.user_id", "username", "passwords.password_hash").
			Where(goqu.C("username").Eq(u.Username)).
			Join(goqu.T("passwords"),
				goqu.On(goqu.Ex{"users.user_id": goqu.I("passwords.user_id")})).
			Executor()

		r, eErr := userQuery.Query()
		rows = r
		return eErr
	})
	defer rows.Close()

	if err != nil {
		log.Println(err)
		return User{}, fmt.Errorf("failed get user by auth query: %s", err)
	}

	var user User
	var pass string
	for rows.Next() {
		if err := rows.Scan(&user.Id, &user.Username, &pass); err != nil {
			log.Println("scan error")
			return User{}, err
		}
	}
	if err = rows.Err(); err != nil {
		log.Println(user)
		log.Println(pass)
		log.Println("rows error")
		return User{}, err
	}
	if pass != u.Password {
		fmt.Printf("Got user {%s} but wrong password", u.Username)
		return User{}, fmt.Errorf("failed get user by auth query")
	}
	fmt.Printf("Got user{ %s } successfully", u.Username)
	return user, nil
}

func InsertUser(u User, passwordHash string) (string, error) {
	tx, err := dbgoqu.Begin()
	if err != nil {
		return "", fmt.Errorf("error starting transaction: %s", err)
	}
	queryUser := tx.Insert("public.users").Rows(
		User{Username: u.Username, Email: u.Email}).Returning("user_id").Executor()

	var uid uuid.UUID

	if _, err := queryUser.ScanVal(&uid); err != nil {
		if rErr := tx.Rollback(); rErr != nil {
			return "", fmt.Errorf("rollback failed: %s", rErr)
		}
		return "", fmt.Errorf("user query failed: %s", err)
	}

	queryPassword := tx.Insert("public.passwords").Rows(
		Password{uid.String(), passwordHash}).Executor()

	if _, err = queryPassword.Exec(); err != nil {
		if rErr := tx.Rollback(); rErr != nil {
			return "", fmt.Errorf("rollback failed: %s", rErr)
		}
		return "", fmt.Errorf("password query failed: %s", err)
	}

	if err = tx.Commit(); err != nil {
		return "", fmt.Errorf("failed transaction: %s", err)
	}

	fmt.Println("User created successfully")
	return uid.String(), nil
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
