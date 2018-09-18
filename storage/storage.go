package storage

import (
	"io"
)

type Storage interface {
	Put(io.ReadCloser, string) (string, error)
	Get(string) (io.ReadCloser, error)
}
