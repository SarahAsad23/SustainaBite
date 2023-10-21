// include the express modules
var express = require("express");

// create an express application
var app = express();
const url = require('url');

// include the mysql module
var mysql = require("mysql");

var con = mysql.createConnection({
  host: "",
  user: "",               // replace with the database for the app
  password: "",                  // replace with our database password
  port: 3306
});

con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
});

// server listens on port 9007 for incoming connections
app.listen(9007, () => console.log('Listening on port 9007!'));





