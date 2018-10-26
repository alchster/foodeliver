package storage

import (
	"bufio"
	"errors"
	"github.com/gofrs/uuid"
	"io"
	//"ioutil"
	"log"
	"os"
	"path/filepath"
)

type FSStorage struct {
	basePath string
}

var InvalidPath = errors.New("Invalid path for file system storage. Must be existed directory")
var NotFound = errors.New("File not found in storage")

func NewFSStorage(path string) (Storage, error) {
	absPath, err := filepath.Abs(path)
	if err != nil {
		return nil, err
	}
	if stat, err := os.Stat(absPath); err != nil || !stat.IsDir() {
		return nil, InvalidPath
	}
	return &FSStorage{absPath}, nil
}

func (s *FSStorage) Put(rc io.ReadCloser, ext string) (string, error) {
	defer rc.Close()
	// TODO: made filenames from hash
	uid, err := uuid.NewV4()
	if err != nil {
		return "", err
	}
	filename := uid.String() + ext
	dir := filepath.Join(s.basePath, filename[:2])
	log.Print(dir, "\t", filename)
	if _, err := os.Stat(dir); err != nil {
		os.Mkdir(dir, 0777)
	}
	out, err := os.Create(filepath.Join(dir, filename))
	if err != nil {
		return "", err
	}
	defer out.Close()
	w := bufio.NewWriter(out)
	if _, err := io.Copy(w, rc); err != nil {
		return "", err
	}
	w.Flush()
	return filename, nil
}

func (s *FSStorage) Get(name string) (io.ReadCloser, error) {
	path := filepath.Join(s.basePath, name[:2], name)
	return os.Open(path)
}
