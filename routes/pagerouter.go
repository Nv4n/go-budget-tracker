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
		r.Use(AuthMiddleWare)
		r.Get("/", func(w http.ResponseWriter, r *http.Request) {
			tmpls := template.Must(template.New("").Funcs(funcMap).ParseFiles(
				"views/index.go.html",
				"views/components/nav.go.html"))

			err := tmpls.ExecuteTemplate(w, "Base", nil)
			if err != nil {
				return
			}
		})
		r.Get("/budget/create", func(w http.ResponseWriter, r *http.Request) {
			tmpls := template.Must(template.New("budget-create").Funcs(funcMap).ParseFiles(
				"views/index.go.html",
				"views/components/nav.go.html",
				"views/forms/createBudgetForm.go.html",
				"views/components/input.go.html"))

			err := tmpls.ExecuteTemplate(w, "Base", nil)
			if err != nil {
				return
			}
		})
		r.Get("/budget/{id}/edit", func(w http.ResponseWriter, r *http.Request) {
			tmpls := template.Must(template.New("budget-edit").Funcs(funcMap).ParseFiles(
				"views/index.go.html",
				"views/components/nav.go.html",
				"views/forms/editBudgetForm.go.html"))

			err := tmpls.ExecuteTemplate(w, "Base", nil)
			if err != nil {
				return
			}
		})

		r.Get("/transaction/create", func(w http.ResponseWriter, r *http.Request) {
			tmpls := template.Must(template.New("transaction-create").Funcs(funcMap).ParseFiles(
				"views/index.go.html",
				"views/components/nav.go.html",
				"views/forms/createTransactionForm.go.html",
				"views/components/input.go.html",
				"views/components/select.go.html"))

			err := tmpls.ExecuteTemplate(w, "Base", nil)
			if err != nil {
				return
			}
		})
		r.Get("/transaction/{id}/edit", func(w http.ResponseWriter, r *http.Request) {
			tmpls := template.Must(template.New("transaction-edit").Funcs(funcMap).ParseFiles(
				"views/index.go.html",
				"views/components/nav.go.html",
				"views/forms/editTransactionForm.go.html",
				"views/components/input.go.html",
				"views/components/select.go.html"))

			err := tmpls.ExecuteTemplate(w, "Base", nil)
			if err != nil {
				return
			}
		})

		r.Get("/wallet/create", func(w http.ResponseWriter, r *http.Request) {
			tmpls := template.Must(template.New("wallet-create").Funcs(funcMap).ParseFiles(
				"views/index.go.html",
				"views/components/nav.go.html",
				"views/forms/createWalletForm.go.html",
				"views/components/input.go.html"))

			err := tmpls.ExecuteTemplate(w, "Base", nil)
			if err != nil {
				return
			}
		})
		r.Get("/wallet/{id}/edit", func(w http.ResponseWriter, r *http.Request) {
			tmpls := template.Must(template.New("wallet-edit").Funcs(funcMap).ParseFiles(
				"views/index.go.html",
				"views/components/nav.go.html",
				"views/forms/editWalletForm.go.html"))

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
