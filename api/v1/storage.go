package api_v1

import (
	"errors"
	"fmt"
	"github.com/alchster/foodeliver/storage"
	"github.com/gin-gonic/gin"
	"io"
	"log"
	"mime"
	"net/http"
	"path/filepath"
	"strings"
)

const MAX_UPLOAD_SIZE = 1048576
const MAX_AGE = 3600

var FileNotFound = errors.New("File not found in storage")
var FileIsTooLarge = errors.New("Uploading file is too large")
var InvalidExtension = errors.New("Invalid file extension")

func setupStorage(router *gin.Engine, url string, store storage.Storage) {
	router.GET(url+"/:file", func(c *gin.Context) {
		file := c.Params.ByName("file")
		contentType := mime.TypeByExtension(filepath.Ext(file))
		content, err := store.Get(file)
		if err != nil {
			notFound(err, c)
			return
		}
		defer content.Close()
		c.Writer.WriteHeader(http.StatusOK)
		c.Writer.Header().Set("Content-Type", contentType)
		c.Writer.Header().Set("Cache-Control", fmt.Sprintf("max-age=%d", MAX_AGE))
		if _, err := io.Copy(c.Writer, content); err != nil {
			log.Print("File getting error: ", err.Error())
		}
	})
	if trainID.IsZero() {
		router.POST(url, authMiddleware.MiddlewareFunc(), func(c *gin.Context) {
			file, e := c.FormFile("file")
			if e != nil {
				c.AbortWithStatus(http.StatusExpectationFailed)
				return
			}

			if file.Size > MAX_UPLOAD_SIZE {
				badRequest(FileIsTooLarge, c)
				return
			}

			var name string
			ext := strings.ToLower(filepath.Ext(file.Filename))
			if ext != ".png" && ext != ".jpg" && ext != ".jpeg" {
				badRequest(InvalidExtension, c)
				return
			}

			rc, err := file.Open()
			if err != nil {
				badRequest(err, c)
				return
			}

			name, err = store.Put(rc, ext)
			if err != nil {
				unprocessable(err, c)
				return
			}

			c.JSON(http.StatusOK, h{
				"status": "ok",
				"url":    filepath.Join(url, name),
			})
		})
	}
}
