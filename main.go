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

	// Check all required tables exist in database, and create them if they don't
	for _, table := range []string{"users", "posts", "comments", "categories", "sessions"} {
		handlers.CheckTablesExist(database, table)
	}
	fmt.Println("All tables exist in database.")

	// defer database.Close()

	// Start hosting web server
	fileServer := http.FileServer(http.Dir("static"))                 // serve content from the static directory
	http.Handle("/static/", http.StripPrefix("/static/", fileServer)) // redirect any requests to the root URL to the static directory
	http.Handle("/", fileServer)
	http.HandleFunc("/login", handlers.LoginHandler)
	http.HandleFunc("/register", handlers.RegistrationHandler)
	fmt.Println("Server started at http://localhost:8080.")
	if err := http.ListenAndServe(":8080", nil); err != nil {
		log.Fatal(err)
	}

	// fetchUserRecords(database)
}
