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
	"log"
	"net/http"
	"regexp"
)

type UserAuthRegisterDto struct {
	Username   string `validate:"required,email" json:"username"`
	Email      string `validate:"required" json:"email"`
	Password   string `validate:"required,min=8,max=32,password" json:"password"`
	Repassword string `validate:"required,eqfield=Password" json:"repassword"`
}
type UserAuthLoginDto struct {
	Username string `validate:"required,email" json:"username"`
	Password string `validate:"required,min=8,max=32,password" json:"password"`
}

var validate *validator.Validate

func init() {
	validate = validator.New()

	validate.RegisterValidation("password", MatchPassword)
}

func MatchPassword(fl validator.FieldLevel) bool {
	value := fl.Field().String()
	return regexp.MustCompile("^(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,32}$").Match([]byte(value))
}

func AuthMiddleWare(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		_, err := sessions.AuthStore.Get(r, dotenv.GetDotEnvVar("SESS_KEY"))
		if err != nil {
			w.Header().Set("Location", "/login") // Suggest a redirect location
			w.WriteHeader(http.StatusTemporaryRedirect)
			return
		}
		path := r.URL.Path
		if http.MethodGet == r.Method &&
			(path == "login" || path == "logout" || path == "register") {
			w.Header().Set("Location", "/") // Suggest a redirect location
			w.WriteHeader(http.StatusTemporaryRedirect)
		}

		next.ServeHTTP(w, r)
	})
}

func healthCheck(w http.ResponseWriter, r http.Request) {

}

func AuthRouter() {
	r := chi.NewRouter()
	r.Post("/register", func(w http.ResponseWriter, r *http.Request) {
		Register(w, r)
	})
	r.Post("/login", func(w http.ResponseWriter, r *http.Request) {
		Login(w, r)
	})
}

func Register(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		log.Println(err)
		w.WriteHeader(400)
		return
	}
	user := UserAuthRegisterDto{
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
			return
		}
	}

	password, err := bcrypt.GenerateFromPassword([]byte(user.Password), 15)
	if err != nil {
		log.Println(err)
		w.WriteHeader(500)
		return
	}
	u := model.User{
		Email:    user.Email,
		Username: user.Username,
	}

	err = model.InsertUser(u, string(password))
	if err != nil {
		log.Println(err)
		w.WriteHeader(500)
		return
	}
}

func Login(w http.ResponseWriter, r *http.Request) {
	err := r.ParseForm()
	if err != nil {
		log.Println(err)
		w.WriteHeader(400)
		return
	}
	user := UserAuthLoginDto{
		Username: r.PostForm.Get("username"),
		Password: r.PostForm.Get("password"),
	}
	err = validate.Struct(user)
	if err != nil {
		var invalidValidationError *validator.InvalidValidationError
		if errors.As(err, &invalidValidationError) {
			fmt.Println(err)
			return
		}
	}

	password, err := bcrypt.GenerateFromPassword([]byte(user.Password), 15)
	if err != nil {
		log.Println(err)
		w.WriteHeader(500)
		return
	}
	u := model.User{
		Email:    user.Email,
		Username: user.Username,
	}

	err = model.GetUserById(u, string(password))
	if err != nil {
		log.Println(err)
		w.WriteHeader(403)
		return
	}
}
