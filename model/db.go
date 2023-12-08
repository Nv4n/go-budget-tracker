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
	pgDb, err := sql.Open("postgres", dotenv.GetDotEnvVar("DB_CREDENTIALS"))
	if err != nil {
		panic(fmt.Errorf("problem opening DB: %s", err))
	}
	defer pgDb.Close()
	if err = pgDb.Ping(); err != nil {
		log.Fatalf("Problem connecting to DB: %s", err.Error())
	}

	dialect := goqu.Dialect("postgres")
	dbgoqu = dialect.DB(pgDb)
}
