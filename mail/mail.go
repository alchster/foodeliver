package mail

import (
	"crypto/tls"
	"log"
	"net"
	//"net/mail"
	"net/smtp"
	"strings"
)

var (
	server, from string
	tlsconfig    *tls.Config
	auth         smtp.Auth
)

type Mail struct {
	To      string
	Subject string
	Body    string
}

func Init(user, pass, serv string, opts []string, nameFrom string) error {
	server = serv
	from = nameFrom
	host, _, _ := net.SplitHostPort(server)
	for _, o := range opts {
		o = strings.ToUpper(o)
		if o == "STARTTLS" {
			tlsconfig = &tls.Config{
				InsecureSkipVerify: true,
				ServerName:         host,
			}
		}
		if o == "PLAIN" {
			auth = smtp.PlainAuth("", user, pass, host)
		}
	}
	log.Print("Mailer configured")
	return nil
}
