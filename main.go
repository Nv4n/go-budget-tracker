package main

import (
	"html/template"
	"log"
	"net/http"

	"github.com/doug-martin/goqu/v9"
	_ "github.com/doug-martin/goqu/v9/dialect/postgres"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func addCacheControl(h http.Handler, maxAge int) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "public, max-age="+string(maxAge))
		h.ServeHTTP(w, r)
	})
}

func main() {
	dialect := goqu.Dialect("postgres")
	ds := dialect.DB()
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	staticFileServer := http.StripPrefix("/static/", http.FileServer(http.Dir("./static")))
	r.Handle("/static/*", addCacheControl(staticFileServer, 31536000))
	staticFileServer = http.StripPrefix("/preline/", http.FileServer(http.Dir("./node_modules/preline/dist")))
	r.Handle("/preline/*", addCacheControl(staticFileServer, 31536000))

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		tmpls := template.Must(template.ParseFiles("templates/index.html", "templates/strongpass.html"))
		err := tmpls.ExecuteTemplate(w, "Base", nil)
		if err != nil {
			return
		}

	})
	log.Fatal(http.ListenAndServe("localhost:3000", r))
}
