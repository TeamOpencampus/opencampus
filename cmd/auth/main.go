package main

import (
	"context"
	"log"
	"net/http"
	"opencampus/gen/proto/auth/v1/authv1connect"
	"opencampus/internal/auth"
	"opencampus/internal/auth/ent"

	"golang.org/x/net/http2"
	"golang.org/x/net/http2/h2c"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	log.Printf("connecting to sqlite database\n")
	client, err := ent.Open("sqlite3", "file:ent?mode=memory&cache=shared&_fk=1")
	if err != nil {
		log.Fatalf("failed opening connection to sqlite: %v", err)
	}
	defer client.Close()
	log.Printf("running automatic schema migration\n")
	if err := client.Schema.Create(context.Background()); err != nil {
		log.Fatalf("failed creating schema resources: %v", err)
	}

	service := &auth.AuthServer{Client: client}
	path, handler := authv1connect.NewAuthServiceHandler(service)

	mux := http.NewServeMux()
	mux.Handle(path, handler)

	log.Printf("starting server on port 8080\n")
	http.ListenAndServe(
		"localhost:8080",
		h2c.NewHandler(mux, &http2.Server{}),
	)
}
