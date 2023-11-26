package main

import (
	"database/sql"
	"fmt"
	"github.com/Nv4n/go-budget-tracker/cmd/dotenv"
	_ "github.com/doug-martin/goqu/v9/dialect/postgres"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/google/uuid"
	_ "github.com/lib/pq"
	"html/template"
	"log"
	"net/http"
	"strings"
)

func addCacheControl(h http.Handler, maxAge int) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", "public, max-age="+string(maxAge))
		h.ServeHTTP(w, r)
	})
}

func newUuid() string {
	return uuid.New().String()
}

func main() {
	//dialect := goqu.Dialect("postgres")
	pgDb, err := sql.Open("postgres", dotenv.GetDotEnvVar("DB_CREDENTIALS"))
	if err != nil {
		log.Fatal("Problem opening DB")
	}
	defer pgDb.Close()
	if err := pgDb.Ping(); err != nil {
		log.Fatal("Problem connecting DB")
	}

	//db := dialect.DB(pgDb)

	r := chi.NewRouter()
	r.Use(middleware.Logger)
	staticFileServer := http.StripPrefix("/static/", http.FileServer(http.Dir("./static")))
	r.Handle("/static/*", addCacheControl(staticFileServer, 31536000))
	staticFileServer = http.StripPrefix("/preline/", http.FileServer(http.Dir("./node_modules/preline/dist")))
	r.Handle("/preline/*", addCacheControl(staticFileServer, 31536000))

	funcMap := template.FuncMap{
		"uuid":    newUuid,
		"toLower": strings.ToLower,
	}

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		tmpls := template.Must(template.ParseFiles("views/index.go.html"))
		err := tmpls.ExecuteTemplate(w, "Base", nil)
		if err != nil {
			return
		}
	})
	r.Get("/login", func(w http.ResponseWriter, r *http.Request) {
		tmpls := template.Must(template.New("login").Funcs(funcMap).ParseFiles("views/index.go.html", "views/signup/loginPage.go.html", "views/signup/input.go.html", "views/signup/strongPassword.go.html"))
		w.Header().Set("Cache-Control", "public, max-age="+fmt.Sprintf("%d", 3600))
		err := tmpls.ExecuteTemplate(w, "Base", nil)
		if err != nil {
			return
		}
	})
	r.Get("/register", func(w http.ResponseWriter, r *http.Request) {
		tmpls := template.Must(template.New("register").Funcs(funcMap).ParseFiles("views/index.go.html", "views/signup/registerPage.go.html", "views/signup/input.go.html", "views/signup/strongPassword.go.html"))
		w.Header().Set("Cache-Control", "public, max-age="+fmt.Sprintf("%d", 3600))
		err := tmpls.ExecuteTemplate(w, "Base", nil)
		if err != nil {
			return
		}
	})

	log.Fatal(http.ListenAndServe("localhost:3000", r))
}
