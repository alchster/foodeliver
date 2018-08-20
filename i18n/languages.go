package i18n

import (
	"golang.org/x/text/language"
	//"golang.org/x/text/language/display"
	"log"
)

type LanguageCode [2]rune

type Language struct {
	Code        LanguageCode
	EnglishName string
	NativeName  string
}

func LoadLanguage(languageCode string) *Language {
	bcp47 := language.BCP47.Make(languageCode)
	l := Language{}
	for i, r := range bcp47.String() {
		l.Code[i] = r
	}
	//		EnglishName: display.English.Tags().Name(tag),
	//		NativeName:  display.Self.Name(tag),
	//	if err != nil {
	//		return false
	//	}
	log.Print(l)
	return &l
}

func (lc LanguageCode) String() string {
	return string(lc[:])
}
