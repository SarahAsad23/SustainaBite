// include the express modules
var express = require("express");

// create an express application
var app = express();
const url = require('url');

// helps in extracting the body portion of an incoming request stream
var bodyparser = require('body-parser');

// helps in managing user sessions
var session = require('express-session');

// include the mysql module
var mysql = require("mysql");

// Bcrypt library for comparing password hashes
const bcrypt = require('bcrypt');

const { google } = require('googleapis');

//session value
var session;
const key = require('./client_secret_979630756564-q1hslh7tt4s9hdpj6n1v3gkd0hf5bmtj.apps.googleusercontent.com.json'); // Replace with the path to your JSON key file

var con = mysql.createConnection({
  host: "34.71.5.117",
  user: "test",               // replace with the database for the app
  password: "test",
  database: "sustainabite",
  // replace with our database password
  port: 3306
});

con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
});

// apply the body-parser middleware to all incoming requests
//app.use(bodyparser());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));

// use express-session
app.use(session({
  secret: "currentUserSession",
  saveUninitialized: true,
  resave: false
}
));

// server listens on port 9007 for incoming connections
app.listen(9007, () => console.log('Listening on port 9007!'));

// // function to return the welcome page
// app.get('/',function(req, res) {
//   res.sendFile(__dirname + '/NewUser.tsx');
// });

// app.use(__dirname, express.static(__dirname))

//get login page
app.get('/login', function(req,res){
    
    if (req.session.value) {
      console.log("logged in already");
      console.log("success");
      res.json({status: "success"});
  } else {
      console.log("not logged in: req.session.value not set!!!");
      console.log("fail");
      res.json({status: "fail"});
  }
  
});

//login details
app.post('sendLoginDetails', function (req,res) {
    let username = req.body.username;
    let password = req.body.password;
    
    var found = false;
      con.query("SELECT * FROM restaurant_registration WHERE username = ?",[username], function(err,rows,fields) {
          if(err) throw err;
          if (rows.length == 0) {
            console.log("No entries found in restaurants");
          } else {
            console.log("comparing");
            if (bcrypt.compareSync(password, rows[0].acc_password)) {
              req.session.user = username;
              console.log("Starting Session");
              req.session.value = 1;
              found = true;
              res.json({status: rows[0].acc_type});
              
            } else {
              console.log("fail password for restaurants");
            //   res.json({status: "fail"});
            }
          }
      });
      if (!found) {
        con.query("SELECT * FROM org_registration WHERE username = ?",[username], function(err,rows,fields) {
                if(err) throw err;
                if (rows.length == 0) {
                    console.log("No entries found in organizations");
                    res.json({status:"fail"});
                } else {
                    console.log("comparing");
                    if (bcrypt.compareSync(password, rows[0].acc_password)) {
                    req.session.user = username;
                    console.log("Starting Session");
                    req.session.value = 1;
                    found = true;
                    res.json({status: rows[0].acc_type});
                    
                    } else {
                    console.log("fail password for restaurants");
                    res.json({status: "fail"});
                    }
                }
            });
      }
});

//add new registered user
app.post("/postRegisterAccount/:type", function(req,res) {
      console.log("posting");
      var reqBody = req.body;
      var accType = req.params.type;
      console.log(reqBody);
      registerAccount(req,res,reqBody, accType);
});

function registerAccount(req,res,reqBody, accType) {
    var name = reqBody.name;
    var address = reqBody.address;
    var username = reqBody.username;
    var password = reqBody.password; 
    var capacity;
    if (accType == "restaurant") {
        con.query("INSERT INTO restaurant_registration (username, password, name, address) VALUES (?, ?, ?, ?)", [username, password, name, address],
        function(err, rows, fields) {
            if(err) throw err;
            else {
              console.log("Inserted query!");
            }
        });
        res.json({status: "success"});
    } else if (accType == "organization") {
        capacity= reqBody.capacity;
        con.query("INSERT INTO org_registration (username, password, name, address, occupancy) VALUES (?, ?, ?, ?, ?)", [username, password, name, address, occupancy],
        function(err, rows, fields) {
            if(err) throw err;
            else {
              console.log("Inserted query!");
            }
        });
        res.json({status: "success"});
    } else {
        res.json({status: "fail"});
    }
}





