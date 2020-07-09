// dependencies
// ===============================================================
var express = require("express");
var fs = require("fs");
const e = require("express");

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

// main page - html
app.get("*", (req, res) => {
    res.sendFile(__dirname, "/public/index.html");
  });

// notes page - html
app.get("/notes", (req, res) => {
    res.sendFile(__dirname + "/public/notes.html");
});

// get notes - api
app.get("/api/notes", (req, res) => {
    res.sendFile(__dirname + "/db/db.json");
});

// post notes - api
app.post("/api/notes", (req, res) => {
    
    fs.readFile(__dirname + "/db/db.json", "utf8", (error, data) => {

        if (error) {
          console.log(error);
        }
        else {
            note = JSON.parse(data);
        }      

        req.body.id = note[note.length - 1].id + 1;

        note.push(req.body);

        fs.writeFile(__dirname + "/db/db.json", JSON.stringify(note), (error, data) => {
            if (error) {
                console.log(error);
            } 
            else {
                res.sendFile(__dirname + "/db/db.json");
                console.log("Your note has been added!")
            }
    
        });
      });
});

// delete notes - api 
app.delete("/api/notes/:id", function (req, res) {

    fs.readFile(__dirname + '/db/db.json', "utf8", (error, data) => {
        if (error) {
            console.log(error);
        } else {

            let newNote = JSON.parse(data).filter(notes => {
                if (notes.id != req.params.id) {
                    return notes;
                }
            });

            fs.writeFile(__dirname + '/db/db.json', JSON.stringify(newNote), (error, data) => {
                if (error) {
                    console.log(err);
                } else {
                    res.sendFile(__dirname + "/db/db.json");
                    console.log("Your note has been deleted.");
                }
            });
        }
    });
});


// SERVER LISTENING 
// ===============================================================
app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
});
