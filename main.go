package main

import (
	"bytes"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
)

type Response struct {
	Payload	string
}

func encode(t string, n int) string {
	var e = ""
	for r := 0; r < len(t); r++ {
		e += fmt.Sprintf("%c", n ^ int([]rune(t)[r]))
	}
	return e
}

func main() {
	PerimeterXHandler := func(w http.ResponseWriter, req *http.Request) {
		tmpl := template.Must(template.ParseFiles("templates/layout.html"))
		_ = tmpl.Execute(w, nil)
	}

	DecodeHandler := func(w http.ResponseWriter, req *http.Request) {
		var p Response
		err := json.NewDecoder(req.Body).Decode(&p)
		if err != nil {
			http.Error(w, "error: unable to read decoded string", http.StatusBadRequest)
			return
		}
		result, err := base64.StdEncoding.DecodeString(p.Payload)
		if err != nil{
			http.Error(w, "error: unable to read decoded string", http.StatusBadRequest)
			return
		}
		encodedStr := encode(string(result), 50)
		_, err = fmt.Fprint(w, encodedStr)
		if err != nil{
			http.Error(w, "error: unable to read decoded string", http.StatusBadRequest)
			return
		}
	}

	EncodeHandler := func(w http.ResponseWriter, req *http.Request) {
		var p Response
		err := json.NewDecoder(req.Body).Decode(&p)
		if err != nil {
			http.Error(w, "error: unable to read req.Body", http.StatusBadRequest)
			return
		}

		jsonBytes := []byte(p.Payload)
		buffer := new(bytes.Buffer)
		if err := json.Compact(buffer, jsonBytes); err != nil {
			http.Error(w, "error: unable to read your json input", http.StatusOK)
			return
		}

		encodedString := encode(buffer.String(), 50)
		encodedBytes := []byte(encodedString)
		encodedResult := base64.StdEncoding.EncodeToString(encodedBytes)
		_, _ = fmt.Fprint(w, encodedResult)
	}

	http.HandleFunc("/", PerimeterXHandler)
	http.HandleFunc("/decode", DecodeHandler)
	http.HandleFunc("/encode", EncodeHandler)
	fs := http.FileServer(http.Dir("./static"))
	http.Handle("/static/", http.StripPrefix("/static/", fs))
	log.Fatal(http.ListenAndServe(":8000", nil))
	//log.Fatal(http.ListenAndServe(":" + os.Getenv("PORT"), nil))
}

