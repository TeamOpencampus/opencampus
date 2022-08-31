// Code generated by protoc-gen-go. DO NOT EDIT.
// versions:
// 	protoc-gen-go v1.28.1
// 	protoc        (unknown)
// source: proto/user/v1/user.proto

package userv1

import (
	protoreflect "google.golang.org/protobuf/reflect/protoreflect"
	protoimpl "google.golang.org/protobuf/runtime/protoimpl"
	reflect "reflect"
	sync "sync"
)

const (
	// Verify that this generated code is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(20 - protoimpl.MinVersion)
	// Verify that runtime/protoimpl is sufficiently up-to-date.
	_ = protoimpl.EnforceVersion(protoimpl.MaxVersion - 20)
)

type MeRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *MeRequest) Reset() {
	*x = MeRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[0]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MeRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MeRequest) ProtoMessage() {}

func (x *MeRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[0]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MeRequest.ProtoReflect.Descriptor instead.
func (*MeRequest) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{0}
}

type MeResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *MeResponse) Reset() {
	*x = MeResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[1]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *MeResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*MeResponse) ProtoMessage() {}

func (x *MeResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[1]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use MeResponse.ProtoReflect.Descriptor instead.
func (*MeResponse) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{1}
}

type InstitutesRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *InstitutesRequest) Reset() {
	*x = InstitutesRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[2]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *InstitutesRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*InstitutesRequest) ProtoMessage() {}

func (x *InstitutesRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[2]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use InstitutesRequest.ProtoReflect.Descriptor instead.
func (*InstitutesRequest) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{2}
}

type InstitutesResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *InstitutesResponse) Reset() {
	*x = InstitutesResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[3]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *InstitutesResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*InstitutesResponse) ProtoMessage() {}

func (x *InstitutesResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[3]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use InstitutesResponse.ProtoReflect.Descriptor instead.
func (*InstitutesResponse) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{3}
}

type JoinInstituteRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *JoinInstituteRequest) Reset() {
	*x = JoinInstituteRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[4]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *JoinInstituteRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*JoinInstituteRequest) ProtoMessage() {}

func (x *JoinInstituteRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[4]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use JoinInstituteRequest.ProtoReflect.Descriptor instead.
func (*JoinInstituteRequest) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{4}
}

type JoinInstituteResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *JoinInstituteResponse) Reset() {
	*x = JoinInstituteResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[5]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *JoinInstituteResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*JoinInstituteResponse) ProtoMessage() {}

func (x *JoinInstituteResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[5]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use JoinInstituteResponse.ProtoReflect.Descriptor instead.
func (*JoinInstituteResponse) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{5}
}

type JobsRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *JobsRequest) Reset() {
	*x = JobsRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[6]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *JobsRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*JobsRequest) ProtoMessage() {}

func (x *JobsRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[6]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use JobsRequest.ProtoReflect.Descriptor instead.
func (*JobsRequest) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{6}
}

type JobsResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *JobsResponse) Reset() {
	*x = JobsResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[7]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *JobsResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*JobsResponse) ProtoMessage() {}

func (x *JobsResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[7]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use JobsResponse.ProtoReflect.Descriptor instead.
func (*JobsResponse) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{7}
}

type JobByIdRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *JobByIdRequest) Reset() {
	*x = JobByIdRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[8]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *JobByIdRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*JobByIdRequest) ProtoMessage() {}

func (x *JobByIdRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[8]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use JobByIdRequest.ProtoReflect.Descriptor instead.
func (*JobByIdRequest) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{8}
}

type JobByIdResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *JobByIdResponse) Reset() {
	*x = JobByIdResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[9]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *JobByIdResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*JobByIdResponse) ProtoMessage() {}

func (x *JobByIdResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[9]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use JobByIdResponse.ProtoReflect.Descriptor instead.
func (*JobByIdResponse) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{9}
}

type ApplyRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *ApplyRequest) Reset() {
	*x = ApplyRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[10]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ApplyRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ApplyRequest) ProtoMessage() {}

func (x *ApplyRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[10]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ApplyRequest.ProtoReflect.Descriptor instead.
func (*ApplyRequest) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{10}
}

type ApplyResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *ApplyResponse) Reset() {
	*x = ApplyResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[11]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *ApplyResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*ApplyResponse) ProtoMessage() {}

func (x *ApplyResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[11]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use ApplyResponse.ProtoReflect.Descriptor instead.
func (*ApplyResponse) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{11}
}

type RetractRequest struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *RetractRequest) Reset() {
	*x = RetractRequest{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[12]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RetractRequest) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RetractRequest) ProtoMessage() {}

func (x *RetractRequest) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[12]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RetractRequest.ProtoReflect.Descriptor instead.
func (*RetractRequest) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{12}
}

type RetractResponse struct {
	state         protoimpl.MessageState
	sizeCache     protoimpl.SizeCache
	unknownFields protoimpl.UnknownFields
}

func (x *RetractResponse) Reset() {
	*x = RetractResponse{}
	if protoimpl.UnsafeEnabled {
		mi := &file_proto_user_v1_user_proto_msgTypes[13]
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		ms.StoreMessageInfo(mi)
	}
}

func (x *RetractResponse) String() string {
	return protoimpl.X.MessageStringOf(x)
}

func (*RetractResponse) ProtoMessage() {}

func (x *RetractResponse) ProtoReflect() protoreflect.Message {
	mi := &file_proto_user_v1_user_proto_msgTypes[13]
	if protoimpl.UnsafeEnabled && x != nil {
		ms := protoimpl.X.MessageStateOf(protoimpl.Pointer(x))
		if ms.LoadMessageInfo() == nil {
			ms.StoreMessageInfo(mi)
		}
		return ms
	}
	return mi.MessageOf(x)
}

// Deprecated: Use RetractResponse.ProtoReflect.Descriptor instead.
func (*RetractResponse) Descriptor() ([]byte, []int) {
	return file_proto_user_v1_user_proto_rawDescGZIP(), []int{13}
}

var File_proto_user_v1_user_proto protoreflect.FileDescriptor

var file_proto_user_v1_user_proto_rawDesc = []byte{
	0x0a, 0x18, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x75, 0x73, 0x65, 0x72, 0x2f, 0x76, 0x31, 0x2f,
	0x75, 0x73, 0x65, 0x72, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x12, 0x0d, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x22, 0x0b, 0x0a, 0x09, 0x4d, 0x65, 0x52,
	0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x0c, 0x0a, 0x0a, 0x4d, 0x65, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x22, 0x13, 0x0a, 0x11, 0x49, 0x6e, 0x73, 0x74, 0x69, 0x74, 0x75, 0x74,
	0x65, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x14, 0x0a, 0x12, 0x49, 0x6e, 0x73,
	0x74, 0x69, 0x74, 0x75, 0x74, 0x65, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22,
	0x16, 0x0a, 0x14, 0x4a, 0x6f, 0x69, 0x6e, 0x49, 0x6e, 0x73, 0x74, 0x69, 0x74, 0x75, 0x74, 0x65,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x17, 0x0a, 0x15, 0x4a, 0x6f, 0x69, 0x6e, 0x49,
	0x6e, 0x73, 0x74, 0x69, 0x74, 0x75, 0x74, 0x65, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65,
	0x22, 0x0d, 0x0a, 0x0b, 0x4a, 0x6f, 0x62, 0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22,
	0x0e, 0x0a, 0x0c, 0x4a, 0x6f, 0x62, 0x73, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22,
	0x10, 0x0a, 0x0e, 0x4a, 0x6f, 0x62, 0x42, 0x79, 0x49, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73,
	0x74, 0x22, 0x11, 0x0a, 0x0f, 0x4a, 0x6f, 0x62, 0x42, 0x79, 0x49, 0x64, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x22, 0x0e, 0x0a, 0x0c, 0x41, 0x70, 0x70, 0x6c, 0x79, 0x52, 0x65, 0x71,
	0x75, 0x65, 0x73, 0x74, 0x22, 0x0f, 0x0a, 0x0d, 0x41, 0x70, 0x70, 0x6c, 0x79, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x22, 0x10, 0x0a, 0x0e, 0x52, 0x65, 0x74, 0x72, 0x61, 0x63, 0x74,
	0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x22, 0x11, 0x0a, 0x0f, 0x52, 0x65, 0x74, 0x72, 0x61,
	0x63, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x32, 0x90, 0x04, 0x0a, 0x0b, 0x55,
	0x73, 0x65, 0x72, 0x53, 0x65, 0x72, 0x76, 0x69, 0x63, 0x65, 0x12, 0x39, 0x0a, 0x02, 0x4d, 0x65,
	0x12, 0x18, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x76, 0x31,
	0x2e, 0x4d, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x19, 0x2e, 0x70, 0x72, 0x6f,
	0x74, 0x6f, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x4d, 0x65, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x51, 0x0a, 0x0a, 0x49, 0x6e, 0x73, 0x74, 0x69, 0x74, 0x75,
	0x74, 0x65, 0x73, 0x12, 0x20, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x75, 0x73, 0x65, 0x72,
	0x2e, 0x76, 0x31, 0x2e, 0x49, 0x6e, 0x73, 0x74, 0x69, 0x74, 0x75, 0x74, 0x65, 0x73, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x21, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x75, 0x73,
	0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x49, 0x6e, 0x73, 0x74, 0x69, 0x74, 0x75, 0x74, 0x65, 0x73,
	0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x5a, 0x0a, 0x0d, 0x4a, 0x6f, 0x69, 0x6e,
	0x49, 0x6e, 0x73, 0x74, 0x69, 0x74, 0x75, 0x74, 0x65, 0x12, 0x23, 0x2e, 0x70, 0x72, 0x6f, 0x74,
	0x6f, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x4a, 0x6f, 0x69, 0x6e, 0x49, 0x6e,
	0x73, 0x74, 0x69, 0x74, 0x75, 0x74, 0x65, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x24,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x4a,
	0x6f, 0x69, 0x6e, 0x49, 0x6e, 0x73, 0x74, 0x69, 0x74, 0x75, 0x74, 0x65, 0x52, 0x65, 0x73, 0x70,
	0x6f, 0x6e, 0x73, 0x65, 0x12, 0x3f, 0x0a, 0x04, 0x4a, 0x6f, 0x62, 0x73, 0x12, 0x1a, 0x2e, 0x70,
	0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x4a, 0x6f, 0x62,
	0x73, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1b, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x4a, 0x6f, 0x62, 0x73, 0x52, 0x65, 0x73,
	0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12, 0x48, 0x0a, 0x07, 0x4a, 0x6f, 0x62, 0x42, 0x79, 0x49, 0x64,
	0x12, 0x1d, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x76, 0x31,
	0x2e, 0x4a, 0x6f, 0x62, 0x42, 0x79, 0x49, 0x64, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a,
	0x1e, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e,
	0x4a, 0x6f, 0x62, 0x42, 0x79, 0x49, 0x64, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x12,
	0x42, 0x0a, 0x05, 0x41, 0x70, 0x70, 0x6c, 0x79, 0x12, 0x1b, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f,
	0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x41, 0x70, 0x70, 0x6c, 0x79, 0x52, 0x65,
	0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1c, 0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x75, 0x73,
	0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x41, 0x70, 0x70, 0x6c, 0x79, 0x52, 0x65, 0x73, 0x70, 0x6f,
	0x6e, 0x73, 0x65, 0x12, 0x48, 0x0a, 0x07, 0x52, 0x65, 0x74, 0x72, 0x61, 0x63, 0x74, 0x12, 0x1d,
	0x2e, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x52,
	0x65, 0x74, 0x72, 0x61, 0x63, 0x74, 0x52, 0x65, 0x71, 0x75, 0x65, 0x73, 0x74, 0x1a, 0x1e, 0x2e,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2e, 0x75, 0x73, 0x65, 0x72, 0x2e, 0x76, 0x31, 0x2e, 0x52, 0x65,
	0x74, 0x72, 0x61, 0x63, 0x74, 0x52, 0x65, 0x73, 0x70, 0x6f, 0x6e, 0x73, 0x65, 0x42, 0x25, 0x5a,
	0x23, 0x6f, 0x70, 0x65, 0x6e, 0x63, 0x61, 0x6d, 0x70, 0x75, 0x73, 0x2f, 0x67, 0x65, 0x6e, 0x2f,
	0x70, 0x72, 0x6f, 0x74, 0x6f, 0x2f, 0x75, 0x73, 0x65, 0x72, 0x2f, 0x76, 0x31, 0x3b, 0x75, 0x73,
	0x65, 0x72, 0x76, 0x31, 0x62, 0x06, 0x70, 0x72, 0x6f, 0x74, 0x6f, 0x33,
}

var (
	file_proto_user_v1_user_proto_rawDescOnce sync.Once
	file_proto_user_v1_user_proto_rawDescData = file_proto_user_v1_user_proto_rawDesc
)

func file_proto_user_v1_user_proto_rawDescGZIP() []byte {
	file_proto_user_v1_user_proto_rawDescOnce.Do(func() {
		file_proto_user_v1_user_proto_rawDescData = protoimpl.X.CompressGZIP(file_proto_user_v1_user_proto_rawDescData)
	})
	return file_proto_user_v1_user_proto_rawDescData
}

var file_proto_user_v1_user_proto_msgTypes = make([]protoimpl.MessageInfo, 14)
var file_proto_user_v1_user_proto_goTypes = []interface{}{
	(*MeRequest)(nil),             // 0: proto.user.v1.MeRequest
	(*MeResponse)(nil),            // 1: proto.user.v1.MeResponse
	(*InstitutesRequest)(nil),     // 2: proto.user.v1.InstitutesRequest
	(*InstitutesResponse)(nil),    // 3: proto.user.v1.InstitutesResponse
	(*JoinInstituteRequest)(nil),  // 4: proto.user.v1.JoinInstituteRequest
	(*JoinInstituteResponse)(nil), // 5: proto.user.v1.JoinInstituteResponse
	(*JobsRequest)(nil),           // 6: proto.user.v1.JobsRequest
	(*JobsResponse)(nil),          // 7: proto.user.v1.JobsResponse
	(*JobByIdRequest)(nil),        // 8: proto.user.v1.JobByIdRequest
	(*JobByIdResponse)(nil),       // 9: proto.user.v1.JobByIdResponse
	(*ApplyRequest)(nil),          // 10: proto.user.v1.ApplyRequest
	(*ApplyResponse)(nil),         // 11: proto.user.v1.ApplyResponse
	(*RetractRequest)(nil),        // 12: proto.user.v1.RetractRequest
	(*RetractResponse)(nil),       // 13: proto.user.v1.RetractResponse
}
var file_proto_user_v1_user_proto_depIdxs = []int32{
	0,  // 0: proto.user.v1.UserService.Me:input_type -> proto.user.v1.MeRequest
	2,  // 1: proto.user.v1.UserService.Institutes:input_type -> proto.user.v1.InstitutesRequest
	4,  // 2: proto.user.v1.UserService.JoinInstitute:input_type -> proto.user.v1.JoinInstituteRequest
	6,  // 3: proto.user.v1.UserService.Jobs:input_type -> proto.user.v1.JobsRequest
	8,  // 4: proto.user.v1.UserService.JobById:input_type -> proto.user.v1.JobByIdRequest
	10, // 5: proto.user.v1.UserService.Apply:input_type -> proto.user.v1.ApplyRequest
	12, // 6: proto.user.v1.UserService.Retract:input_type -> proto.user.v1.RetractRequest
	1,  // 7: proto.user.v1.UserService.Me:output_type -> proto.user.v1.MeResponse
	3,  // 8: proto.user.v1.UserService.Institutes:output_type -> proto.user.v1.InstitutesResponse
	5,  // 9: proto.user.v1.UserService.JoinInstitute:output_type -> proto.user.v1.JoinInstituteResponse
	7,  // 10: proto.user.v1.UserService.Jobs:output_type -> proto.user.v1.JobsResponse
	9,  // 11: proto.user.v1.UserService.JobById:output_type -> proto.user.v1.JobByIdResponse
	11, // 12: proto.user.v1.UserService.Apply:output_type -> proto.user.v1.ApplyResponse
	13, // 13: proto.user.v1.UserService.Retract:output_type -> proto.user.v1.RetractResponse
	7,  // [7:14] is the sub-list for method output_type
	0,  // [0:7] is the sub-list for method input_type
	0,  // [0:0] is the sub-list for extension type_name
	0,  // [0:0] is the sub-list for extension extendee
	0,  // [0:0] is the sub-list for field type_name
}

func init() { file_proto_user_v1_user_proto_init() }
func file_proto_user_v1_user_proto_init() {
	if File_proto_user_v1_user_proto != nil {
		return
	}
	if !protoimpl.UnsafeEnabled {
		file_proto_user_v1_user_proto_msgTypes[0].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MeRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_user_v1_user_proto_msgTypes[1].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*MeResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_user_v1_user_proto_msgTypes[2].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*InstitutesRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_user_v1_user_proto_msgTypes[3].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*InstitutesResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_user_v1_user_proto_msgTypes[4].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*JoinInstituteRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_user_v1_user_proto_msgTypes[5].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*JoinInstituteResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_user_v1_user_proto_msgTypes[6].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*JobsRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_user_v1_user_proto_msgTypes[7].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*JobsResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_user_v1_user_proto_msgTypes[8].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*JobByIdRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_user_v1_user_proto_msgTypes[9].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*JobByIdResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_user_v1_user_proto_msgTypes[10].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ApplyRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_user_v1_user_proto_msgTypes[11].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*ApplyResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_user_v1_user_proto_msgTypes[12].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RetractRequest); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
		file_proto_user_v1_user_proto_msgTypes[13].Exporter = func(v interface{}, i int) interface{} {
			switch v := v.(*RetractResponse); i {
			case 0:
				return &v.state
			case 1:
				return &v.sizeCache
			case 2:
				return &v.unknownFields
			default:
				return nil
			}
		}
	}
	type x struct{}
	out := protoimpl.TypeBuilder{
		File: protoimpl.DescBuilder{
			GoPackagePath: reflect.TypeOf(x{}).PkgPath(),
			RawDescriptor: file_proto_user_v1_user_proto_rawDesc,
			NumEnums:      0,
			NumMessages:   14,
			NumExtensions: 0,
			NumServices:   1,
		},
		GoTypes:           file_proto_user_v1_user_proto_goTypes,
		DependencyIndexes: file_proto_user_v1_user_proto_depIdxs,
		MessageInfos:      file_proto_user_v1_user_proto_msgTypes,
	}.Build()
	File_proto_user_v1_user_proto = out.File
	file_proto_user_v1_user_proto_rawDesc = nil
	file_proto_user_v1_user_proto_goTypes = nil
	file_proto_user_v1_user_proto_depIdxs = nil
}