package main

import (
	"net/http"
	"opencampus/gen/proto/user/v1/userv1connect"
	"opencampus/internal/user"

	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func main() {
	service := &user.UserServer{}
	path, handler := userv1connect.NewUserServiceHandler(service)

	mux := http.NewServeMux()
	mux.Handle(path, handler)

	http.ListenAndServe(
		"localhost:8080",
		h2c.NewHandler(mux, &http2.Server{}),
	)
}
