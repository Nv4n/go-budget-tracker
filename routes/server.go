package routes

import (
	"fmt"
	"github.com/Nv4n/go-budget-tracker/cmd/dotenv"
	_ "github.com/doug-martin/goqu/v9/dialect/postgres"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/go-chi/docgen"
	"github.com/go-chi/httprate"
	"github.com/gorilla/sessions"
	_ "github.com/lib/pq"
	"log"
	"net/http"
	"os"
	"time"
)

func addCacheControl(h http.Handler, maxAge int) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Cache-Control", fmt.Sprintf("private, max-age=%d", maxAge))
		//w.Header().Set("Cache-Control", "private, no-cache")
		h.ServeHTTP(w, r)
	})
}

var (
	store    *sessions.CookieStore
	AUTH_KEY string = "authenticated"
	USER_ID  string = "user_id"
)

func SetupServer() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)
	r.Use(middleware.Compress(5, "text/html", "text/css", "text/css; charset=utf-8", "text/html; charset=utf-8"))
	r.Use(middleware.RequestID)
	r.Use(httprate.LimitByIP(100, 1*time.Minute))
	r.Use(middleware.Recoverer)

	store = sessions.NewCookieStore([]byte(dotenv.GetDotEnvVar("SESSION_TOKEN")))
	store.Options = &sessions.Options{
		Path:   "/",
		MaxAge: 3600 * 5,
		//Secure: true, for https
		HttpOnly: true,
		SameSite: http.SameSiteStrictMode,
	}

	staticFileServer := http.StripPrefix("/static/", http.FileServer(http.Dir("./static")))
	r.Handle("/static/*", addCacheControl(staticFileServer, 31536000))
	staticFileServer = http.StripPrefix("/preline/", http.FileServer(http.Dir("./node_modules/preline/dist")))
	r.Handle("/preline/*", addCacheControl(staticFileServer, 31536000))

	pr := PageRouter()
	r.Mount("/", pr)

	r.NotFound(func(w http.ResponseWriter, r *http.Request) {
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
	})
	r.MethodNotAllowed(func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(405)
		_, err := w.Write([]byte("method is not valid"))
		if err != nil {
			panic(err)
		}

	})

	//genDoc(r)
	log.Println("Listening to localhost:3000")
	log.Fatal(http.ListenAndServe("localhost:3000", r))
}

func genDoc(r *chi.Mux) {
	md := docgen.MarkdownRoutesDoc(r, docgen.MarkdownOpts{})
	bytes := []byte(md)

	err := os.WriteFile("./routes.md", bytes, os.ModeTemporary)
	if err != nil {
		log.Fatal(err)
	}
}
