package auth

import (
	"context"

	authv1 "opencampus/gen/proto/auth/v1"

	"github.com/bufbuild/connect-go"
)

type AuthServer struct{}

func (s *AuthServer) Login(
	_ context.Context,
	_ *connect.Request[authv1.LoginRequest],
) (*connect.Response[authv1.LoginResponse], error) {
	panic("not implemented") // TODO: Implement
}

func (s *AuthServer) Register(
	_ context.Context,
	_ *connect.Request[authv1.RegisterRequest],
) (*connect.Response[authv1.RegisterResponse], error) {
	panic("not implemented") // TODO: Implement
}

func (s *AuthServer) VerifyEmail(
	_ context.Context,
	_ *connect.Request[authv1.VerifyEmailRequest],
) (*connect.Response[authv1.VerifyEmailResponse], error) {
	panic("not implemented") // TODO: Implement
}

func (s *AuthServer) ResetPassword(
	_ context.Context,
	_ *connect.Request[authv1.ResetPasswordRequest],
) (*connect.Response[authv1.ResetPasswordResponse], error) {
	panic("not implemented") // TODO: Implement
}
