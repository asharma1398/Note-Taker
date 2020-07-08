// dependency
// ===============================================================
var express = require("express");
var fs = require("fs");

// needed variable(s)
// ==============================================================
var note = [];

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
    res.sendFile(__dirname + "/public/notes.html");
});

// get notes api
app.get("/api/notes", (req, res) => {
    res.sendFile(__dirname + "/db/db.json");

    
});

// post notes api
app.post("/api/notes", (req, res) => {
    
    fs.readFile(__dirname + "/db/db.json", "utf8", (error, data) => {

        if (error) {
          return console.log(error);
        }
        else {
            
            note = JSON.parse(data);
            console.log(note);
        }      

        req.body.id = note[note.length - 1].id + 1;

        note.push(req.body);

        console.log("note", note);

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(note), (error, data) => {
            if (error) {
                return console.log(error);
            } else {
                console.log("Success!")
            }
    
        })

      });
    
});

// server starts listening
// ===============================================================
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
  