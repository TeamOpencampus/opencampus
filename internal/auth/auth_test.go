package auth

import (
	"context"
	"net/http"
	authv1 "opencampus/gen/proto/auth/v1"
	"opencampus/gen/proto/auth/v1/authv1connect"
	"testing"

	"github.com/bufbuild/connect-go"
	"github.com/stretchr/testify/assert"
)

func TestAuth(t *testing.T) {
	client := authv1connect.NewAuthServiceClient(
		http.DefaultClient,
		"http://localhost:8080",
	)

	t.Run("failed login attempt", func(t *testing.T) {
		_, err := client.Login(
			context.Background(),
			connect.NewRequest(&authv1.LoginRequest{
				Email:    "someone@example.com",
				Password: "MySuperSecurePassword",
			}),
		)

		assert.Equal(t, connect.CodeOf(err), connect.CodeNotFound)
	})

	t.Run("successful user registration", func(t *testing.T) {
		res, err := client.Register(
			context.Background(),
			connect.NewRequest(&authv1.RegisterRequest{
				Email:    "someone@example.com",
				Password: "MySuperSecurePassword",
			}),
		)

		assert.NoError(t, err)
		assert.Equal(t, res.Msg.Type, "bearer")
	})

	t.Run("duplicate user registration", func(t *testing.T) {
		_, err := client.Register(
			context.Background(),
			connect.NewRequest(&authv1.RegisterRequest{
				Email:    "someone@example.com",
				Password: "MySuperSecurePassword",
			}),
		)

		assert.Equal(t, connect.CodeOf(err), connect.CodeAlreadyExists)
	})

	t.Run("successful login", func(t *testing.T) {
		res, err := client.Login(
			context.Background(),
			connect.NewRequest(&authv1.LoginRequest{
				Email:    "someone@example.com",
				Password: "MySuperSecurePassword",
			}),
		)

		assert.NoError(t, err)
		assert.Equal(t, res.Msg.Type, "bearer")
	})
}
