package auth

import (
	"github.com/Nv4n/go-budget-tracker/cmd/dotenv"
	"log"
	"time"
)

var AuthStore *PGStore

func SetupSessions() {
	// Fetch new store.

	store, err := NewPGStore(dotenv.GetDotEnvVar("DEV_DB_CREDENTIALS"), []byte("secret-key"), []byte("secret-key2"))
	if err != nil {
		log.Fatalf(err.Error())
	}
	AuthStore = store
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