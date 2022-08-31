package auth

import (
	"context"
	"time"

	authv1 "opencampus/gen/proto/auth/v1"
	"opencampus/internal/auth/ent"
	"opencampus/internal/auth/ent/user"

	"github.com/bufbuild/connect-go"
	"github.com/golang-jwt/jwt/v4"
	"golang.org/x/crypto/bcrypt"
)

type AuthServer struct{ Client *ent.Client }

func (s *AuthServer) Login(
	ctx context.Context,
	req *connect.Request[authv1.LoginRequest],
) (*connect.Response[authv1.LoginResponse], error) {
	// check if user exists
	user, err := s.Client.User.
		Query().
		Where(user.Email(req.Msg.Email)).
		Only(ctx)

	if err != nil {
		return nil, connect.NewError(connect.CodeNotFound, err)
	}
	// check password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Msg.Password)); err != nil {
		return nil, connect.NewError(connect.CodePermissionDenied, err)
	}
	// return token
	accessToken, err := NewSignedToken(user.ID.String(), time.Now().Add(time.Hour))
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}
	refreshToken, err := NewSignedToken(user.ID.String(), time.Now().Add(time.Hour*24*7))
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&authv1.LoginResponse{
		Type:         "bearer",
		ExpiresAt:    time.Now().Add(time.Hour).String(),
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}), nil
}

func (s *AuthServer) Register(
	ctx context.Context,
	req *connect.Request[authv1.RegisterRequest],
) (*connect.Response[authv1.RegisterResponse], error) {
	// generate password hash
	hash, err := bcrypt.GenerateFromPassword([]byte(req.Msg.Password), bcrypt.DefaultCost)
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}
	// create user
	user, err := s.Client.
		User.
		Create().
		SetEmail(req.Msg.Email).
		SetPassword(string(hash)).
		Save(ctx)

	if err != nil {
		return nil, connect.NewError(connect.CodeAlreadyExists, err)
	}

	// return token
	accessToken, err := NewSignedToken(user.ID.String(), time.Now().Add(time.Hour))
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}
	refreshToken, err := NewSignedToken(user.ID.String(), time.Now().Add(time.Hour*24*7))
	if err != nil {
		return nil, connect.NewError(connect.CodeInternal, err)
	}

	return connect.NewResponse(&authv1.RegisterResponse{
		Type:         "bearer",
		ExpiresAt:    time.Now().Add(time.Hour).String(),
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
	}), nil
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

func NewSignedToken(sub string, exp time.Time) (string, error) {
	claims := jwt.RegisteredClaims{
		Subject:   sub,
		ExpiresAt: jwt.NewNumericDate(exp),
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(`secret_key`)) // TODO: change signing key
}
