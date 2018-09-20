package api_v1

import (
	"bytes"
	"encoding/json"
	"errors"
	"github.com/alchster/foodeliver/db"
	"github.com/appleboy/gin-jwt"
	"github.com/foolin/gin-template"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"html/template"
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"
)

const TEMPLATES_PATH = "templ"
const TEMPLATES_EXT = ".template"
const STATIC_PATH = "static"

var templateConfig = gintemplate.TemplateConfig{
	Root:         TEMPLATES_PATH,
	Extension:    TEMPLATES_EXT,
	DisableCache: true,
	Partials: []string{
		"parts/create-user",
	},
	Funcs: template.FuncMap{
		"time": func(t time.Time) string {
			loc, _ := time.LoadLocation("Europe/Moscow")
			return time.Time(t).In(loc).Format("15:04")
		},
		"date": func(t time.Time) string {
			loc, _ := time.LoadLocation("Europe/Moscow")
			return time.Time(t).In(loc).Format("2006/01/02")
		},
		"datetime": func(t time.Time) string {
			return db.TimeResp(t).String()
		},
		"same": func(id1, id2 db.UUID) bool {
			return id1 == id2
		},
		"isnil": func(t *time.Time) bool {
			return t == nil
		},
		"strToId": func(s string) string {
			return strings.Replace(s, " ", "_", -1)
		},
		"byKey": func(m map[string]db.StatusOrdersInfo, key string) db.StatusOrdersInfo {
			val, _ := m[key]
			return val
		},
	},
}

var AccessDenied = errors.New("Access denied")

func setupTemplates(router *gin.Engine, base string) error {
	root, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		return nil
	}
	router.Use(static.Serve(base, static.LocalFile(filepath.Join(root, STATIC_PATH), false)))
	router.HTMLRender = gintemplate.New(templateConfig)
	router.GET("/login", login)
	router.GET("/logout", logout)
	router.POST("/login", loginHandler)
	router.GET(base+"/admin", authMiddleware.MiddlewareFunc(), admin)
	router.GET(base+"/accounts", authMiddleware.MiddlewareFunc(), accounts)
	router.GET(base+"/settings", authMiddleware.MiddlewareFunc(), settings)
	router.GET(base+"/orders", authMiddleware.MiddlewareFunc(), supplierOrders)
	router.GET(base+"/catalog", authMiddleware.MiddlewareFunc(), supplierCatalog)
	router.GET(base+"/delivery", authMiddleware.MiddlewareFunc(), supplierDelivery)
	router.GET(base+"/moderator", authMiddleware.MiddlewareFunc(), moderatorSuppliers)
	router.GET(base+"/moderator-catalog", authMiddleware.MiddlewareFunc(), moderatorCatalog)
	router.GET(base+"/registry", authMiddleware.MiddlewareFunc(), adminSuppliers)
	router.GET(base+"/statistics", authMiddleware.MiddlewareFunc(), adminStatistics)
	router.GET(base, authMiddleware.MiddlewareFunc(), settings)
	return nil
}

func userInfo(c *gin.Context, url string) (*db.UserInfo, bool) {
	claims := jwt.ExtractClaims(c)
	userId, _ := claims["user_id"].(string)
	role, _ := claims["type"].(string)
	ui, err := db.GetUserInfo(userId, role)
	if err != nil {
		badRequest(err, c)
		return nil, false
	}
	if !hasAccess(ui.Role, url) {
		c.Redirect(http.StatusFound, indexForRole(ui.Role))
		return nil, false
	}
	return ui, true
}

func login(c *gin.Context) {
	c.Writer.Header().Set("Referer", c.Request.Header.Get("Location"))
	c.HTML(http.StatusOK, "login.template", nil)
}

func logout(c *gin.Context) {
	c.SetCookie("JWTToken", "", -1, "/", "", authMiddleware.SecureCookie, true)
	c.Redirect(http.StatusFound, c.Request.Header.Get("Referer"))
}

func loginHandler(c *gin.Context) {
	isJSON := c.Request.Header.Get("Content-Type") == "application/json"
	var wh *WriterHook
	if !isJSON {
		q := new(struct {
			Username string `form:"username" json:"username"`
			Password string `form:"password" json:"password"`
		})
		c.Bind(q)
		c.Request.Header.Set("Content-Type", "application/json")
		body, _ := json.Marshal(q)
		c.Request.Body = ioutil.NopCloser(bytes.NewReader(body))
		wh = NewWriterHook(c.Writer)
		c.Writer = wh
	}
	authMiddleware.LoginHandler(c)
	if !isJSON {
		wh.RealWriteHeader(http.StatusFound)
		c.Writer = wh.ResponseWriter
		ref := c.Request.Header.Get("Referer")
		if ref == "" {
			ref = "/settings"
		}
		c.Writer.Header().Set("Location", ref)
		wh.FakeData.WriteTo(c.Writer)
	}
}

func accounts(c *gin.Context) {
	ui, ok := userInfo(c, "/accounts")
	if !ok {
		return
	}

	c.HTML(http.StatusOK, "accounts.template", h{
		"userInfo": ui,
		"url":      "/accounts",
		"menu":     menuItems(ui.Role),
		"data":     accountsList(ui.ID.String()),
	})
}

func settings(c *gin.Context) {
	ui, ok := userInfo(c, "/settings")
	if !ok {
		return
	}

	c.HTML(http.StatusOK, "settings.template", h{
		"userInfo": ui,
		"url":      "/settings",
		"menu":     menuItems(ui.Role),
	})
}

func admin(c *gin.Context) {
	ui, ok := userInfo(c, "/admin")
	if !ok {
		return
	}

	c.HTML(http.StatusOK, "index.template", h{
		"userInfo": ui,
		"url":      "/admin",
		"menu":     menuItems(ui.Role),
		"data":     adminIndexInfo(ui.ID.String()),
	})
}

func adminSuppliers(c *gin.Context) {
	ui, ok := userInfo(c, "/registry")
	if !ok {
		return
	}

	c.HTML(http.StatusOK, "supplier-register.template", h{
		"userInfo": ui,
		"url":      "/registry",
		"menu":     menuItems(ui.Role),
		"data":     adminDataCatalog(ui.ID),
	})
}

func adminStatistics(c *gin.Context) {
	ui, ok := userInfo(c, "/statistics")
	if !ok {
		return
	}

	c.HTML(http.StatusOK, "statistic.template", h{
		"userInfo": ui,
		"url":      "/statistics",
		"menu":     menuItems(ui.Role),
		"data":     adminStats(ui.ID),
	})
}

func supplierOrders(c *gin.Context) {
	ui, ok := userInfo(c, "/orders")
	if !ok {
		return
	}

	c.HTML(http.StatusOK, "provider.template", h{
		"userInfo": ui,
		"url":      "/orders",
		"menu":     menuItems(ui.Role),
		"data":     supplierDataOrders(ui.ID),
	})
}

func supplierCatalog(c *gin.Context) {
	ui, ok := userInfo(c, "/catalog")
	if !ok {
		return
	}

	c.HTML(http.StatusOK, "provider-catalog.template", h{
		"userInfo": ui,
		"url":      "/catalog",
		"menu":     menuItems(ui.Role),
		"data":     supplierDataProducts(ui.ID),
	})
}

func supplierDelivery(c *gin.Context) {
	ui, ok := userInfo(c, "/delivery")
	if !ok {
		return
	}

	c.HTML(http.StatusOK, "delivery-settings.template", h{
		"userInfo": ui,
		"url":      "/delivery",
		"menu":     menuItems(ui.Role),
		"data":     supplierDataDelivery(ui.ID),
	})
}

func moderatorSuppliers(c *gin.Context) {
	ui, ok := userInfo(c, "/moderator")
	if !ok {
		return
	}

	c.HTML(http.StatusOK, "supplier-register.template", h{
		"userInfo": ui,
		"url":      "/moderator",
		"menu":     menuItems(ui.Role),
		"data":     moderatorDataCatalog(ui.ID),
	})
}

func moderatorCatalog(c *gin.Context) {
	ui, ok := userInfo(c, "/moderator-catalog")
	if !ok {
		return
	}

	c.HTML(http.StatusOK, "moderator-catalog.template", h{
		"userInfo": ui,
		"url":      "/moderator-catalog",
		"menu":     menuItems(ui.Role),
		"data":     moderatorDataCatalog(ui.ID),
	})
}

type date string

func (d date) Time(lastNanosecond bool) (time.Time, error) {
	now := time.Now()
	tm, err := time.ParseInLocation("2006/01/02", string(d), now.Location())
	if err != nil {
		return time.Time{}, err
	}
	if lastNanosecond {
		tm = tm.Add(time.Hour*24 - time.Nanosecond)
	}
	return tm, nil
}

func getStat(c *gin.Context) {
	_, permErr := extractClaimsWithCheckPerm("getstat", READ, c)
	if permErr != nil {
		forbidden(permErr, c)
		return
	}

	var q = new(struct {
		Type  string `form:"type"`
		Start date   `form:"start"`
		End   date   `form:"end"`
	})

	if err := c.Bind(q); err != nil {
		badRequest(err, c)
		return
	}

	start, _ := q.Start.Time(false)
	end, _ := q.End.Time(true)

	data, err := db.GetStats(q.Type, start, end)
	if err != nil {
		unprocessable(err, c)
		return
	}

	c.JSON(http.StatusOK, data)
}
