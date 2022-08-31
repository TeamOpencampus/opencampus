package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"github.com/rs/xid"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.String("id").GoType(xid.ID{}).DefaultFunc(xid.New),
		field.String("email").Unique().NotEmpty(),
		field.String("password").NotEmpty(),
		field.Bool("is_verified").Default(false),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return nil
}
