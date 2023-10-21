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

//session value
var session;

var con = mysql.createConnection({
  host: "s1",
  user: "979630756564-compute@developer.gserviceaccount.com",               // replace with the database for the app
  password: "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDnvkEJgL7Y3177\naIhIjRAyxZKtNt4A1gxIdeVjkOHsy59r0QfFbzh4yp7UuoX1Y2B6vz2Wu6SNL4aB\nFkMMF7wN55zWYrXTKLJO2s7YrRrWMROj6rFM2svwZm8AO8gPl5D/PwamJNbOtP74\np12dn6VBXhqOzlYkJysg2mcGrtRbGz81bkQ2QAfjsSqwhavv0lVGLCjf0kekIdFA\nsYBCD5CpJbmZ9JHbKHScYnEAtGV52P+EO604IlIi9aNLz4cIu/g5o6Kh1l3sw/ZH\nbiDFM+xXfmEIyXrtI3d8XW8kDUzT2FGGrQAFt0cxs2Xd7qlo80Rsk+ubmuFH1k8y\nSQrI/kDPAgMBAAECggEAEWIgFsplhnca9NjegDK0qFpRqlSXSpDD0xuk3Vcc21pa\n1weTAahaIBVy3JoxOjr+HbcCs6/XpA+Qk1ZMKTgOjyx0g1BcOz6uQWQAaBh0DuUX\niBAuxIkVCy9j3Cyf0SuZYMwlf4j74/2Hsrc7OnujNcgNTfEEXSni/k/jsoiivUKl\nZ9uYOURx0VJZm7KvrAYcjm2PC+gGd/axe0/FiCTem6PnudBIBia4rYQTNxRqWKxV\nlogOE1VfJdw5imWjhI1rAGCwo9SMAJYTWEzJ8f1cYU/p9RQuDaJL4ixOAVgBFYMW\nrprS0k7yvNRqkl/wrnf91qImIsIkkjIOs8vI1JdhIQKBgQD7aYwEsWq3GFi4b7ko\niRtLAJdhnXMZnuwyCFpTyN15+EtCGpAoTeilqjPboWPggSH8vc6g0d7zJf/J4HgH\nQZSGzgLyUw5MZ2yvSwYu7WhHaR3gHhRbVDyUFrTk1NRbxIP8DdDdlTV30kUW8st4\nvv80BYy2yPdIn7MnDd+zuetq0wKBgQDr+NMJu5TKWWWf+OuVLIGvbNbw18VUw74w\n7N7w53gkaXvuji5d9/bBmj2LAFlm63PSF5PCsXzw1nUmxSldgLM8NecKeWvM7myH\nBLslxer5XI1TdLLgmKzm6esv0livXdltVp7R+hnQbQOwrIROiJclgyYz8T6bI4Wi\nu+yJPU4clQKBgGuV/iof9gfGLmk2vih/i6Nr7FwEcbXcET1T37uM8GH6g9IU5e2p\ncU47aJerF7+B4xZx7xNY3Cx27V/pY9PPF40caZxjOHIvrA3TcCDyzTYJ4JQAqztt\n78J7eQuXnAxtKwHYs7Gu4UOWQqSQX8wbB8CuQ0oQ8+krFhI3WKxjej+rAoGBAMLv\nn4eeyuAO0gFBpXxqdAfzpez4ky/fNLM+Oz5QOdP6wELmei9utQ5i2QyHkVOQlvGs\nQIjKDyj2QXlxzyZLN8Y50U+51vBI1qcDpYci5WZyqt2SvmMEPXHVNFEhN9pHcWL9\n994G+mRQaof9PJ+T/ykiGuE2Hj4TLkatcE4/stOxAoGAR6+OJRLXeZRaWDYPP7BI\nCoTb7v2epfpMwqwSjvJdFkTbR3+LjV1YWvnMTwQom4PlM5sHuNokoB31oeDgodnE\nOk4ou6Rfgi3QLD7r8nwR6EOkCKoD5QTcEFm9M6DJdEiPW7RZ4N3pS0nMJiYBfxy2\nXTuYdnC3V5YDIb1wjhscvBo",
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

// function to return the welcome page
app.get('/',function(req, res) {
  res.sendFile(__dirname + 'App.js');
});

app.use(express.static('public'))

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
app.post('/sendLoginDetails', function (req,res) {
    let username = req.body.username;
    let password = req.body.password;
    
      con.query("SELECT * FROM account_information WHERE user_name = ?",[acc_username], function(err,rows,fields) {
          if(err) throw err;
          if (rows.length == 0) {
            console.log("No entries found");
            res.json({status:"fail"});
          } else {
            console.log("comparing");
            if (bcrypt.compareSync(password, rows[0].acc_password)) {
              req.session.user = username;
              console.log("Starting Session");
              req.session.value = 1;
              
              res.json({status: rows[0].acc_type});
              
            } else {
              console.log("fail");
              res.json({status: "fail"});
            }
          }
      });
});

//add new registered user
app.post("/postRegisterAccount/:type", function(req,res) {
      console.log("posting");
      var reqBody = req.body;
      var accType = req.params.type;
      console.log(reqBody);
      registerAccount(req,res,reqBody, accType);
      res.json({status: "success"});
});

function registerAccount(req,res,reqBody, accType) {
    var name = reqBody.name;
    var address = reqBody.address;
    var username = reqBody.username;
    var password = reqBody.password; 
    var capacity;
    if (accType == "rest") {
        con.query("INSERT INTO account_information (acc_name, acc_address, acc_username, acc_password, acc_type) VALUES (?, ?, ?, ?)", [name, address, username, password],
        function(err, rows, fields) {
            if(err) throw err;
            else {
              console.log("Inserted query!");
            }
        });
    } else if (accType == "org") {
        capacity= reqBody.capacity;
        con.query("INSERT INTO account_information (acc_name, acc_address, acc_username, acc_password, acc_type) VALUES (?, ?, ?, ?, ?)", [name, address, username, password, capacity],
        function(err, rows, fields) {
            if(err) throw err;
            else {
              console.log("Inserted query!");
            }
        });
    }
}





