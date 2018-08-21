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
	"io/ioutil"
	"net/http"
	"os"
	"path/filepath"
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
	router.GET(base+"/accounts", authMiddleware.MiddlewareFunc(), accounts)
	return nil
}

func userInfo(claims map[string]interface{}) (*db.UserInfo, error) {
	userId, _ := claims["user_id"].(string)
	role, _ := claims["type"].(string)
	return db.GetUserInfo(userId, role)
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
		c.Writer.Header().Set("Location", c.Request.Header.Get("Referer"))
		wh.FakeData.WriteTo(c.Writer)
	}
}

func accounts(c *gin.Context) {
	ui, err := userInfo(jwt.ExtractClaims(c))
	if err != nil {
		badRequest(err, c)
		return
	}
	if ui.Role != "administrator" {
		forbidden(AccessDenied, c)
	}

	c.HTML(http.StatusOK, "accounts.template", h{
		"userInfo": ui,
		"data":     accountsList(ui.ID.String()),
	})
}
