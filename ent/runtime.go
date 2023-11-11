// Code generated by ent, DO NOT EDIT.

package ent

import (
	"time"

	"github.com/Nv4n/go-budget-tracker/ent/schema"
	"github.com/Nv4n/go-budget-tracker/ent/user"
	"github.com/google/uuid"
)

// The init function reads all schema descriptors with runtime code
// (default values, validators, hooks and policies) and stitches it
// to their package variables.
func init() {
	userFields := schema.User{}.Fields()
	_ = userFields
	// userDescUserID is the schema descriptor for user_id field.
	userDescUserID := userFields[0].Descriptor()
	// user.DefaultUserID holds the default value on creation for the user_id field.
	user.DefaultUserID = userDescUserID.Default.(func() uuid.UUID)
	// userDescCreatedAt is the schema descriptor for created_at field.
	userDescCreatedAt := userFields[4].Descriptor()
	// user.DefaultCreatedAt holds the default value on creation for the created_at field.
	user.DefaultCreatedAt = userDescCreatedAt.Default.(func() time.Time)
	// userDescModifiedAt is the schema descriptor for modified_at field.
	userDescModifiedAt := userFields[5].Descriptor()
	// user.DefaultModifiedAt holds the default value on creation for the modified_at field.
	user.DefaultModifiedAt = userDescModifiedAt.Default.(func() time.Time)
}