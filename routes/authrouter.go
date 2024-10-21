package routes

import (
	"errors"
	"fmt"
	"github.com/Nv4n/go-budget-tracker/cmd/auth/sessions"
	"github.com/Nv4n/go-budget-tracker/cmd/dotenv"
	"github.com/Nv4n/go-budget-tracker/model"
	"github.com/go-chi/chi/v5"
	"github.com/go-playground/validator/v10"
	"golang.org/x/crypto/bcrypt"
	"html/template"
	"log"
	"net/http"
	"regexp"
)

var validate *validator.Validate

func init() {
	validate = validator.New()

	validate.RegisterValidation("password", MatchPassword)
}

func MatchPassword(fl validator.FieldLevel) bool {
	password := fl.Field().String()
	// Check for minimum length
	if len(password) < 8 || len(password) > 32 {
		return false
	}

	// Check for presence of at least one digit
	digitPattern := `\d`
	hasDigit, _ := regexp.MatchString(digitPattern, password)
	if !hasDigit {
		return false
	}

	// Check for presence of at least one lowercase letter
	lowerCasePattern := `[a-z]`
	hasLowerCase, _ := regexp.MatchString(lowerCasePattern, password)
	if !hasLowerCase {
		return false
	}

	// Check for presence of at least one uppercase letter
	upperCasePattern := `[A-Z]`
	hasUpperCase, _ := regexp.MatchString(upperCasePattern, password)
	if !hasUpperCase {
		return false
	}

	// Check for presence of only letters and digits
	numericPattern := `[0-9]`
	allAlphaNumeric, _ := regexp.MatchString(numericPattern, password)
	if !allAlphaNumeric {
		return false
	}

	// If all checks pass, return true
	return true

}

func AuthMiddleWare(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		//_, err := sessions.AuthStore.Get(r, dotenv.GetDotEnvVar("SESS_KEY"))
		//
		//if err != nil {
		//	w.Header().Set("Location", "/login") // Suggest a redirect location
		//	w.WriteHeader(http.StatusTemporaryRedirect)
		//	return
		//}
		//path := r.URL.Path
		//if http.MethodGet == r.Method &&
		//	(path == "login" || path == "logout" || path == "register") {
		//	w.Header().Set("Location", "/") // Suggest a redirect location
		//	w.WriteHeader(http.StatusTemporaryRedirect)
		//}

		next.ServeHTTP(w, r)
	})
}

func healthCheck(w http.ResponseWriter, r http.Request) {

}

func AuthRouter() chi.Router {
	r := chi.NewRouter()
	r.Post("/register", func(w http.ResponseWriter, r *http.Request) {
		log.Println("in register")
		Register(w, r)

	})
	r.Post("/login", func(w http.ResponseWriter, r *http.Request) {
		log.Println("in login")
		Login(w, r)
	})

	return r
}

func Register(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		log.Println(err)
		w.WriteHeader(400)
		return
	}
	user := model.UserAuthRegisterDto{
		Email:      r.PostForm.Get("email"),
		Username:   r.PostForm.Get("username"),
		Password:   r.PostForm.Get("password"),
		Repassword: r.PostForm.Get("repassword"),
	}
	err = validate.Struct(user)
	if err != nil {
		var invalidValidationError *validator.InvalidValidationError
		if errors.As(err, &invalidValidationError) {
			fmt.Println(err)

			tmpls := template.Must(template.New("error").Parse(`
<div class="bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
  <span class="font-bold">Danger</span> Wrong attributes
</div>
`))
			err := tmpls.ExecuteTemplate(w, "error", nil)
			w.WriteHeader(400)
			if err != nil {
				w.WriteHeader(500)
			}
			return
		}
	}

	password, err := bcrypt.GenerateFromPassword([]byte(user.Password), 15)
	if err != nil {
		log.Println(err)
		tmpls := template.Must(template.New("error").Parse(`
<div class="bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
  <span class="font-bold">Danger</span>Server error
</div>
`))
		_ = tmpls.ExecuteTemplate(w, "error", nil)
		w.WriteHeader(500)
		return
	}
	u := model.User{
		Email:    user.Email,
		Username: user.Username,
	}

	uid, err := model.InsertUser(u, string(password))
	if err != nil {
		log.Println(err)

		tmpls := template.Must(template.New("error").Parse(`
<div class="bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
  <span class="font-bold">Danger</span> Wrong attributes
</div>
`))
		_ = tmpls.ExecuteTemplate(w, "error", nil)
		w.WriteHeader(500)
		return
	}

	session, err := sessions.AuthStore.New(r, dotenv.GetDotEnvVar("SESS_KEY"))
	if err != nil {
		log.Println(err)
		w.Header().Set("HX-Redirect", "/login")
		w.Header().Set("Location", "/login")
		w.WriteHeader(307)
		return
	}

	session.Values["uid"] = uid
	session.AddFlash("flash", "test-flash")

	if err = session.Save(r, w); err != nil {
		log.Println(err)
		w.Header().Set("HX-Redirect", "/login")
		w.Header().Set("Location", "/login")
		w.WriteHeader(307)
		return
	}
	err = sessions.AuthStore.Save(r, w, session)
	if err != nil {
		log.Println(err)
		w.Header().Set("HX-Redirect", "/login")
		w.Header().Set("Location", "/login")
		w.WriteHeader(307)
		return
	}
	w.Header().Set("HX-Redirect", "/")
	w.Header().Set("Location", "/")
	w.WriteHeader(201)

}

func Login(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		log.Println(err)
		w.WriteHeader(400)
		return
	}
	user := model.UserAuthLoginDto{
		Username: r.PostForm.Get("username"),
		Password: r.PostForm.Get("password"),
	}
	err = validate.Struct(user)
	if err != nil {
		var invalidValidationError *validator.InvalidValidationError
		if errors.As(err, &invalidValidationError) {
			fmt.Println(err)
			w.WriteHeader(400)
			tmpls := template.Must(template.New("error").Parse(`
<div class="bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
  <span class="font-bold">Danger</span> Wrong attributes
</div>
`))
			err := tmpls.ExecuteTemplate(w, "error", nil)
			if err != nil {
				w.WriteHeader(500)
			}
			return
		}
	}

	password, err := bcrypt.GenerateFromPassword([]byte(user.Password), 15)
	if err != nil {
		log.Println(err)
		tmpls := template.Must(template.New("error").Parse(`
<div class="bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
  <span class="font-bold">Danger</span>Server error
</div>
`))
		_ = tmpls.ExecuteTemplate(w, "error", nil)
		w.WriteHeader(500)
		return
	}
	user.Password = string(password)

	getU, err := model.GetUserAuth(user)
	if err != nil {
		log.Println(err)
		tmpls := template.Must(template.New("error").Parse(`
<div class="bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500" role="alert">
  <span class="font-bold">Danger</span>Server error
</div>
`))
		_ = tmpls.ExecuteTemplate(w, "error", nil)
		w.WriteHeader(500)
		return
	}
	w.Header().Set("HX-Redirect", "/")
	w.Header().Set("Location", "/")
	w.WriteHeader(200)
	log.Println(getU)
}
