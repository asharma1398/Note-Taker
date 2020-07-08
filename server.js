// dependency
// ============================================================
var express = require("express");

// express app set up
// ============================================================
var app = express();
var PORT = 8000;

// server starts listening
// ============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  