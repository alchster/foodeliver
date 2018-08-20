package api_v1

const (
	READ permissions = 1 << iota
	CREATE
	UPDATE
	DELETE
)
const (
	RW   = READ | CREATE | UPDATE
	FULL = READ | CREATE | UPDATE | DELETE
)

type permissions int8
type entityPermissions map[string]permissions

var permissionsTable = map[string]entityPermissions{
	"administrator": entityPermissions{
		"user":     FULL,
		"supplier": FULL,
		"station":  FULL,
		"train":    FULL,
		"service":  FULL,
	},
	"moderator": entityPermissions{
		"supplier": RW,
		"product":  RW,
	},
	"supplier": entityPermissions{
		"product": FULL,
	},
}

func hasPermission(role, entity string, perm permissions) bool {
	if entList, ok := permissionsTable[role]; ok {
		if entPerm, ok := entList[entity]; ok {
			return entPerm&perm != 0
		}
	}
	return false
}
