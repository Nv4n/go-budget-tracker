package user

type User struct {
	Id       string `db:"user_id" json:"user_id"`
	Username string `db:"username" json:"username"`
	Email    string `db:"email" json:"email"`
	Password *Password
}

type Password struct {
	PasswordHash string `db:"password_hash" json:"password_hash"`
}

//user_id    UUID      DEFAULT uuid_generate_v4() PRIMARY KEY,
//username   VARCHAR(255) NOT NULL UNIQUE,
//email      VARCHAR(255) NOT NULL UNIQUE,
//created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
