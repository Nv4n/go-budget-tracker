package routes

import (
	"github.com/Masterminds/sprig/v3"
	"github.com/go-chi/chi/v5"
	"html/template"
	"net/http"
)

func HtmlContentMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "text/html; charset=utf-8\n")
		next.ServeHTTP(w, r)
	})
}

type ParsedData struct {
	ChartHTML string
}

func PageRouter() chi.Router {
	r := chi.NewRouter()
	funcMap := sprig.FuncMap()

	r.Use(HtmlContentMiddleware)
	r.Group(func(r chi.Router) {
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			tmpls := template.Must(template.ParseFiles("views/index.go.html"))

			err := tmpls.ExecuteTemplate(w, "Base", nil)
			if err != nil {
				return
			}
		})
	})

	r.Group(func(r chi.Router) {
		r.Get("/login", func(w http.ResponseWriter, r *http.Request) {
			tmpls := template.Must(template.New("login").Funcs(funcMap).ParseFiles(
				"views/index.go.html",
				"views/signup/signupPage.go.html",
				"views/signup/loginForm.go.html",
				"views/signup/strongPassword.go.html",
				"views/components/input.go.html"))
			err := tmpls.ExecuteTemplate(w, "Base", "LOGIN")
			if err != nil {
				return
			}
		})
		r.Get("/register", func(w http.ResponseWriter, r *http.Request) {
			tmpls := template.Must(template.New("register").Funcs(funcMap).ParseFiles(
				"views/index.go.html",
				"views/signup/signupPage.go.html",
				"views/signup/registerForm.go.html",
				"views/signup/strongPassword.go.html",
				"views/components/input.go.html"))
			err := tmpls.ExecuteTemplate(w, "Base", "REGISTER")
			if err != nil {
				return
			}
		})
	})

	return r
}
