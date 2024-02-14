package model

import (
	"database/sql"
	"fmt"
	"github.com/Nv4n/go-budget-tracker/cmd/dotenv"
	"github.com/doug-martin/goqu/v9"
	_ "github.com/doug-martin/goqu/v9/dialect/postgres"
	_ "github.com/lib/pq"
	"log"
)

var db *sql.DB
var dbgoqu *goqu.Database

func SetupDB() {
	pgDb, err := sql.Open("postgres", dotenv.GetDotEnvVar("DEV_DB_CREDENTIALS"))
	if err != nil {
		panic(fmt.Errorf("problem opening DB: %s", err))
	}
	if err = pgDb.Ping(); err != nil {
		log.Fatalf("Problem connecting to DB: %s", err.Error())
	}

	db = pgDb
	dialect := goqu.Dialect("postgres")
	dbgoqu = dialect.DB(pgDb)
}

func CloseDb() {
	defer func(db *sql.DB) {
		err := db.Close()
		if err != nil {
			log.Println(err)
		}
	}(db)
}
