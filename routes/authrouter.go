package routes

import (
	"net/http"
)

//func AuthMiddleWare(next http.Handler) http.Handler {
//	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
//
//		sess, err := store.Get(r, "authsess")
//		sess.
//		ctx := context.WithValue(r.Context(), "user", "123")
//
//		// call the next handler in the chain, passing the response writer and
//		// the updated request object with the new context value.
//		//
//		// note: context.Context values are nested, so any previously set
//		// values will be accessible as well, and the new `"user"` key
//		// will be accessible from this point forward.
//		next.ServeHTTP(w, r.WithContext(ctx))
//	})
//}

func healthCheck(w http.ResponseWriter, r http.Request) {

}

func AuthRouter() {

}
