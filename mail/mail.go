package mail

import (
	"bytes"
	"crypto/tls"
	"fmt"
	"html/template"
	"io/ioutil"
	"log"
	"mime"
	"net"
	netmail "net/mail"
	"net/smtp"
	"path/filepath"
	"strings"
)

type Mailer struct {
	server    string
	from      netmail.Address
	host      string
	debug     bool
	tlsconfig *tls.Config
	auth      smtp.Auth
	url       string
	templates *template.Template
}

func NewMailer(serv, user, pass, nameFrom, templPath, url string, opts []string, debugMode bool) *Mailer {
	h, _, _ := net.SplitHostPort(serv)
	files, err := ioutil.ReadDir(templPath)
	if err != nil {
		return nil
	}
	names := make([]string, 0)
	for _, f := range files {
		if strings.HasSuffix(f.Name(), ".template") {
			names = append(names, filepath.Join(templPath, f.Name()))
		}
	}
	templ, err := template.ParseFiles(names...)
	if err != nil {
		return nil
	}
	mailer := Mailer{
		server:    serv,
		from:      netmail.Address{Name: nameFrom, Address: user},
		host:      h,
		debug:     debugMode,
		templates: templ,
		url:       url,
	}
	for _, o := range opts {
		o = strings.ToUpper(o)
		if o == "STARTTLS" {
			mailer.tlsconfig = &tls.Config{
				InsecureSkipVerify: true,
				ServerName:         h,
			}
		}
		if o == "PLAIN" {
			mailer.auth = smtp.PlainAuth("", user, pass, h)
		}
	}
	if debugMode {
		log.Print("Mailer configured", templ.DefinedTemplates())
	}
	return &mailer
}

func AddressString(a netmail.Address) string {
	return fmt.Sprintf("%v <%s>", a.Name, a.Address)
}

func AddressStringRFC2047(a netmail.Address) string {
	return fmt.Sprintf("%v <%s>", mime.QEncoding.Encode("utf-8", a.Name), a.Address)
}

func (m *Mailer) Send(name, email, subj string, html []byte) error {
	to := netmail.Address{Name: name, Address: email}
	subject := mime.QEncoding.Encode("utf-8", subj)
	headers := map[string]string{
		"From":         AddressStringRFC2047(m.from),
		"To":           AddressStringRFC2047(to),
		"Subject":      subject,
		"Content-Type": "text/html;charset=utf-8",
	}

	message := ""
	for k, v := range headers {
		message += fmt.Sprintf("%s: %s\r\n", k, v)
	}
	message += "\r\n" + string(html)

	conn, err := tls.Dial("tcp", m.server, m.tlsconfig)
	if err != nil {
		log.Printf("Unable to start TLS session: %s\n", err.Error())
		return err
	}
	defer conn.Close()

	c, err := smtp.NewClient(conn, m.host)
	if err != nil {
		log.Printf("Unable to create SMTP client: %s\n", err.Error())
		return err
	}
	defer c.Quit()

	if err = c.Auth(m.auth); err != nil {
		log.Printf("Unable to authenticate SMTP session: %s\n", err.Error())
		return err
	}

	if err = c.Mail(m.from.Address); err != nil {
		log.Printf("Invalid FROM address: %s\n", err.Error())
		return err
	}

	if err = c.Rcpt(to.Address); err != nil {
		log.Printf("Invalid TO address: %s\n", err.Error())
		return err
	}

	w, err := c.Data()
	if err != nil {
		log.Printf("Unable to send DATA command: %s\n", err.Error())
		return err
	}

	if _, err = w.Write([]byte(message)); err != nil {
		log.Printf("Unable to send message command: %s\n", err.Error())
		return err
	}

	if err = w.Close(); err != nil {
		log.Printf("Unable to close SMTP session: %s\n", err.Error())
		return err
	}

	log.Printf("Mail to '%s' sent\n", AddressString(to))
	return nil
}

func (m *Mailer) MakeHTML(template string, data map[string]interface{}) ([]byte, error) {
	data["url"] = m.url
	buf := bytes.NewBuffer([]byte(""))
	if err := m.templates.ExecuteTemplate(buf, template, data); err != nil {
		log.Print("Can't execute teplate: ", err.Error())
	}
	return buf.Bytes(), nil
}
