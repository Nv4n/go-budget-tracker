package main

import (
	"github.com/Nv4n/go-budget-tracker/model"
	"github.com/Nv4n/go-budget-tracker/routes"
)

func main() {
	model.SetupDB()
	defer model.CloseDb()
	routes.SetupSessions()
	defer routes.CloseSessionStore()
	defer routes.StopCleanup(routes.Cleanup())
	routes.SetupServer()
}
