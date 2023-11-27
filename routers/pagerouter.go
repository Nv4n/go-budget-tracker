package routers

import (
	"github.com/go-chi/chi/v5"
	"github.com/google/uuid"
	"html/template"
	"net/http"
	"strings"
)

func uuidv4() string {
	return uuid.New().String()
}
func toLower(val string) string {
	return strings.ToLower(val)
}

func PageRouter() chi.Router {
	r := chi.NewRouter()
	funcMap := template.FuncMap{
		"uuidv4": uuidv4,
		"lower":  toLower,
	}

	r.Get("/", func(w http.ResponseWriter, r *http.Request) {
		tmpls := template.Must(template.ParseFiles("views/index.go.html"))
		err := tmpls.ExecuteTemplate(w, "Base", nil)
		if err != nil {
			return
		}
	})
	r.Get("/login", func(w http.ResponseWriter, r *http.Request) {
		tmpls := template.Must(template.New("login").Funcs(funcMap).ParseFiles("views/index.go.html", "views/signup/signupPage.go.html", "views/signup/loginForm.go.html", "views/signup/strongPassword.go.html", "views/signup/input.go.html"))
		err := tmpls.ExecuteTemplate(w, "Base", "LOGIN")
		if err != nil {
			return
		}
	})
	r.Get("/register", func(w http.ResponseWriter, r *http.Request) {
		tmpls := template.Must(template.New("register").Funcs(funcMap).ParseFiles("views/index.go.html", "views/signup/signupPage.go.html", "views/signup/registerForm.go.html", "views/signup/strongPassword.go.html", "views/signup/input.go.html"))
		err := tmpls.ExecuteTemplate(w, "Base", "REGISTER")
		if err != nil {
			return
		}
	})
	return r
}
