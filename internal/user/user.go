package user

import (
	"context"

	userv1 "opencampus/gen/proto/user/v1"

	"github.com/bufbuild/connect-go"
)

type UserServer struct{}

func (s *UserServer) Me(
	_ context.Context, _ *connect.Request[userv1.MeRequest],
) (*connect.Response[userv1.MeResponse], error) {
	panic("not implemented") // TODO: Implement
}

func (s *UserServer) Institutes(
	_ context.Context, _ *connect.Request[userv1.InstitutesRequest],
) (*connect.Response[userv1.InstitutesResponse], error) {
	panic("not implemented") // TODO: Implement
}

func (s *UserServer) JoinInstitute(
	_ context.Context, _ *connect.Request[userv1.JoinInstituteRequest],
) (*connect.Response[userv1.JoinInstituteResponse], error) {
	panic("not implemented") // TODO: Implement
}

func (s *UserServer) Jobs(
	_ context.Context, _ *connect.Request[userv1.JobsRequest],
) (*connect.Response[userv1.JobsResponse], error) {
	panic("not implemented") // TODO: Implement
}

func (s *UserServer) JobById(
	_ context.Context, _ *connect.Request[userv1.JobByIdRequest],
) (*connect.Response[userv1.JobByIdResponse], error) {
	panic("not implemented") // TODO: Implement
}

func (s *UserServer) Apply(
	_ context.Context, _ *connect.Request[userv1.ApplyRequest],
) (*connect.Response[userv1.ApplyResponse], error) {
	panic("not implemented") // TODO: Implement
}

func (s *UserServer) Retract(
	_ context.Context, _ *connect.Request[userv1.RetractRequest],
) (*connect.Response[userv1.RetractResponse], error) {
	panic("not implemented") // TODO: Implement
}
