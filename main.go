package main

import (
	"github.com/Nv4n/go-budget-tracker/cmd/auth/sessions"
	"github.com/Nv4n/go-budget-tracker/model"
	"github.com/Nv4n/go-budget-tracker/routes"
)

func main() {
	model.SetupDB()
	defer model.CloseDb()
	sessions.SetupSessions()
	defer sessions.CloseSessionStore()
	defer sessions.StopCleanup(sessions.Cleanup())
	routes.SetupServer()
}
