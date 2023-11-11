package schema

import (
	"entgo.io/ent"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
	"time"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("user_id", uuid.UUID{}).
			Default(uuid.New).
			Unique().
			Immutable(),
		field.String("name"),
		field.String("email"),
		field.String("password"),
		field.Time("created_at").
			Default(time.Now),
		field.Time("modified_at").
			Default(time.Now)}

}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return nil
}
