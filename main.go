package main

import (
	"github.com/Nv4n/go-budget-tracker/model"
	"github.com/Nv4n/go-budget-tracker/routes"
)

func main() {
	model.SetupDB()
	routes.SetupServer()
}
