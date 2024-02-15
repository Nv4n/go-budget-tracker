package sessions

import (
	"github.com/Nv4n/go-budget-tracker/cmd/auth/pgstore"
	"github.com/Nv4n/go-budget-tracker/cmd/dotenv"
	"log"
	"time"
)

var AuthStore *pgstore.PGStore

func SetupSessions() {
	// Fetch new store.

	store, err := pgstore.NewPGStore(dotenv.GetDotEnvVar("DEV_DB_CREDENTIALS"), []byte(dotenv.GetDotEnvVar("SESS_KEY")))
	if err != nil {
		log.Fatalf(err.Error())
	}
	AuthStore = store
	AuthStore.MaxAge(3600)
}

func CloseSessionStore() {
	defer AuthStore.Close()
}

func Cleanup() (chan<- struct{}, <-chan struct{}) {
	return AuthStore.Cleanup(time.Minute * 5)
}
func StopCleanup(quit chan<- struct{}, done <-chan struct{}) {
	defer AuthStore.StopCleanup(quit, done)
}
