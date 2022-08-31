package main

import (
	"net/http"
	"opencampus/gen/proto/auth/v1/authv1connect"
	"opencampus/internal/auth"

	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"
)

func main() {
	service := &auth.AuthServer{}
	path, handler := authv1connect.NewAuthServiceHandler(service)

	mux := http.NewServeMux()
	mux.Handle(path, handler)

	http.ListenAndServe(
		"localhost:8080",
		h2c.NewHandler(mux, &http2.Server{}),
	)
}
