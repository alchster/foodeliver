package api_v1

import (
	"github.com/alchster/foodeliver/db"
	"github.com/gin-gonic/gin"
	"net/http"
)

type SupInfo struct {
	ModeratorID db.UUID `json:"moderator,required"`
	SupplierID  db.UUID `json:"supplier,required"`
}

func adminIndexInfo(userId string) map[string]interface{} {
	result := make(map[string]interface{})
	result["stations"], _ = db.ReadAll("station", userId)
	result["trains"], _ = db.ReadAll("train", userId)
	if services, err := db.ReadAll("service", userId); err == nil {
		result["service"] = services.([]db.Service)[0]
	}
	return result
}

func addModerSupplier(c *gin.Context) {
	_, permErr := extractClaimsWithCheckPerm("modsupplier", CREATE, c)
	if permErr != nil {
		forbidden(permErr, c)
		return
	}
	var si SupInfo
	if err := c.BindJSON(&si); err != nil {
		badRequest(err, c)
		return
	}
	if err := db.AddModerSupplier(si.ModeratorID, si.SupplierID); err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, h{"status": "ok"})
}

func deleteModerSupplier(c *gin.Context) {
	_, permErr := extractClaimsWithCheckPerm("modsupplier", DELETE, c)
	if permErr != nil {
		forbidden(permErr, c)
		return
	}
	var si SupInfo
	if err := c.BindJSON(&si); err != nil {
		badRequest(err, c)
		return
	}
	if err := db.DeleteModerSupplier(si.ModeratorID, si.SupplierID); err != nil {
		unprocessable(err, c)
		return
	}
	c.JSON(http.StatusOK, h{"status": "ok"})
}