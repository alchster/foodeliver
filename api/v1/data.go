package api_v1

import "github.com/alchster/foodeliver/db"
import "log"

type SupplierInfo struct {
	ID          db.UUID
	Description string
}

type AccountInfo struct {
	ID               db.UUID
	Description      string
	Login            string
	Created          db.TimeResp
	Updated          db.TimeResp
	Deleted          db.TimeResp
	Active           bool
	AllowedSuppliers []SupplierInfo
	DeniedSuppliers  []SupplierInfo
	Supplier         db.Supplier
}

func accountsList(userId string) map[string]map[db.UUID]AccountInfo {
	users, err := db.ReadAll("user", userId)
	if err != nil {
		log.Print("ERROR:", err)
	}
	suppliers, errSup := db.ReadAll("supplier", userId)
	if errSup != nil {
		log.Print("ERROR:", errSup)
	}
	data := make(map[string]map[db.UUID]AccountInfo)

	data["administrator"] = make(map[db.UUID]AccountInfo)
	data["moderator"] = make(map[db.UUID]AccountInfo)
	data["supplier"] = make(map[db.UUID]AccountInfo)
	for _, u := range users.([]db.User) {
		var updated, deleted db.TimeResp
		if u.UpdatedAt != nil {
			updated = db.TimeResp(*u.UpdatedAt)
		}
		if u.DeletedAt != nil {
			deleted = db.TimeResp(*u.DeletedAt)
		}
		ai := AccountInfo{
			ID:          u.ID,
			Description: u.Description,
			Created:     db.TimeResp(u.CreatedAt),
			Updated:     updated,
			Deleted:     deleted,
			Login:       u.Login,
			Active:      u.Enabled,
		}
		if u.Admin {
			data["administrator"][u.ID] = ai
		} else {
			ai.AllowedSuppliers = make([]SupplierInfo, len(u.AllowedSuppliers))
			for _, s := range u.AllowedSuppliers {
				ai.AllowedSuppliers = append(ai.AllowedSuppliers, SupplierInfo{
					ID:          s.ID,
					Description: s.Description,
				})
			}
			data["moderator"][u.ID] = ai
		}
	}
	for _, s := range suppliers.([]db.Supplier) {
		var updated, deleted db.TimeResp
		if s.UpdatedAt != nil {
			updated = db.TimeResp(*s.UpdatedAt)
		}
		if s.DeletedAt != nil {
			deleted = db.TimeResp(*s.DeletedAt)
		}
		ai := AccountInfo{
			ID:          s.ID,
			Description: s.Description,
			Created:     db.TimeResp(s.CreatedAt),
			Updated:     updated,
			Deleted:     deleted,
			Login:       s.Login,
			Active:      s.StatusCode == db.SUPPLIER_STATUS_ACTIVE,
			Supplier:    s,
		}
		data["supplier"][s.ID] = ai
	}

	return data
}
