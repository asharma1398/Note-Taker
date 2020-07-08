// dependency
// ===============================================================
var express = require("express");
var fs = require("fs");

// express app set up
// ===============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// handles data parsing
// ===============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
// ===============================================================
app.use(express.static("public"));

// main page
app.get("*", (req, res) => {
    res.sendFile(__dirname, "/public/index.html");
  });

// notes page 
app.get("/notes", (req, res) => {
    res.sendFile(__dirname, "/public/add.html");
});

// get notes api
app.get("/api/notes", (req, res) => {
    res.sendFile(__dirname+"/db/db.json");
});

// post notes api

// server starts listening
// ===============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  