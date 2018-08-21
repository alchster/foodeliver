package api_v1

import (
	"bufio"
	"bytes"
	"github.com/gin-gonic/gin"
	"log"
	"net"
	"net/http"
)

type WriterHook struct {
	ResponseWriter gin.ResponseWriter
	FakeStatus     int
	FakeData       bytes.Buffer
}

func NewWriterHook(w gin.ResponseWriter) *WriterHook {
	return &WriterHook{
		ResponseWriter: w,
		FakeStatus:     200,
		FakeData:       bytes.Buffer{},
	}
}

func (w *WriterHook) WriteHeader(rc int) {
	w.FakeStatus = rc
}

func (w *WriterHook) WriteHeaderNow() {
	log.Print("write header now")
}

func (w *WriterHook) RealWriteHeader(rc int) {
	w.ResponseWriter.WriteHeader(rc)
}

func (w *WriterHook) Write(b []byte) (int, error) {
	return w.FakeData.Write(b)
}

func (w *WriterHook) Header() http.Header {
	return w.ResponseWriter.Header()
}

func (w *WriterHook) WriteString(s string) (int, error) {
	return w.FakeData.Write([]byte(s))
}

func (w *WriterHook) Written() bool {
	return w.ResponseWriter.Written()
}

func (w *WriterHook) Status() int {
	return w.FakeStatus
}

func (w *WriterHook) RealStatus() int {
	return w.ResponseWriter.Status()
}

func (w *WriterHook) Hijack() (net.Conn, *bufio.ReadWriter, error) {
	return w.ResponseWriter.Hijack()
}

func (w *WriterHook) CloseNotify() <-chan bool {
	return w.ResponseWriter.(http.CloseNotifier).CloseNotify()
}

func (w *WriterHook) Flush() {
	w.ResponseWriter.Flush()
}

func (w *WriterHook) Size() int {
	return w.ResponseWriter.Size()
}

func (w *WriterHook) Pusher() http.Pusher {
	return w.ResponseWriter.Pusher()
}
