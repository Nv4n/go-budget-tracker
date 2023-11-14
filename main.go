package main

import (
	"html/template"
	"log"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Handle("/static/*", http.StripPrefix("/static/", http.FileServer(http.Dir("./static"))))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		tmpl, _ := template.New("").ParseFiles("templates/index.html")
		err := tmpl.ExecuteTemplate(w, "Base", nil)
		if err != nil {
			return
		}

	})
	log.Fatal(http.ListenAndServe("localhost:3000", r))
}
