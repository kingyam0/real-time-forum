package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"real-time-forum/handlers"

	_ "github.com/mattn/go-sqlite3"
)

func main() {
	// Open database
	database, err := sql.Open("sqlite3", "database.db")
	if err != nil {
		fmt.Println(err.Error())
	}
	data := handlers.Connect(database)

	defer database.Close()

	// Start hosting web server
	fileServer := http.FileServer(http.Dir("./static"))               // serve content from the static directory
	http.Handle("/static/", http.StripPrefix("/static/", fileServer)) // redirect any requests to the root URL to the static directory

	http.HandleFunc("/", data.Home)
	http.HandleFunc("/login", data.LoginHandler)
	http.HandleFunc("/register", data.RegistrationHandler)
	http.HandleFunc("/post", data.Post)
	http.HandleFunc("/ws", data.WsEndpoint)

	fmt.Println("Server started at http://localhost:8080")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}
}
