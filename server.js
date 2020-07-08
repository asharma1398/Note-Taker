// dependency
// ============================================================
var express = require("express");

// express app set up
// ============================================================
var app = express();
var PORT = process.env.PORT || 8000;

// handles data parsing
// ============================================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
// =============================================================
app.use(express.static("public"));

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

app.get("/notes", function(req, res) {
res.sendFile(path.join(__dirname, "/public/add.html"));
});

// server starts listening
// ============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  