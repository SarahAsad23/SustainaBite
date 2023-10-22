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

//middleware for uploading images
const multer = require('multer');

//session value
var session;
const key = require('./client_secret_979630756564-q1hslh7tt4s9hdpj6n1v3gkd0hf5bmtj.apps.googleusercontent.com.json'); // Replace with the path to your JSON key file

var con = mysql.createConnection({
  host: "34.71.5.117",
  user: "test",               // replace with the database for the app
  password: "test",
  database: "sustainabite",
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

//where to store image uploaded and what name to give it
const storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, './images');
  },
  filename(req, file, callback) {
    callback(null, `${file.fieldname}_${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

//request with picture to be uploaded
app.post('/api/upload', upload.array('photo', 3), (req, res) => {
  console.log('file', req.files);
  console.log('body', req.body);
  res.status(200).json({
    message: 'success!',
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log(
    `server is running at http://localhost:${process.env.PORT || 3000}`
  );
});

// app.get("/", express.static(path.join(__dirname, "./public")));


// server listens on port 9007 for incoming connections
app.listen(9007, "10.253.64.216", () => console.log('Listening on port 9007!'));

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
app.post('/sendLoginDetails', function (req,res) {
    let username = req.body.username;
    let password = req.body.password;
    
    found = false;
      con.query("SELECT * FROM restaurant_registration WHERE username = ?",[username], function(err,rows,fields) {
          if(err) throw err;
          if (rows.length == 0) {
            console.log("No entries found in restaurants");
          } else {
            console.log("comparing " + password + " with " + rows[0].password);
            if (rows[0].password === password) {
              req.session.user = username;
              console.log("Starting Session");
              req.session.value = 1;
              found = true;
            //   res.json({status: rows[0].acc_type});
            res.json({status: "restaurant"});
              
            } else {
              console.log("fail password for restaurants");
            //   res.json({status: "fail"});
            }
          }
          console.log(found);
      if (!found) {
        con.query("SELECT * FROM org_registration WHERE username = ?",[username], function(err,rows,fields) {
                if(err) throw err;
                if (rows.length == 0) {
                    console.log("No entries found in organizations");
                    res.json({status:"fail"});
                } else {
                    console.log("comparing " + password + " with " + rows[0].password);
                    if (rows[0].password === password) {
                    // if (bcrypt.compareSync(password, rows[0].password)) {
                    req.session.user = username;
                    console.log("Starting Session");
                    req.session.value = 1;
                    found = true;
                    // res.json({status: rows[0].acc_type});
                    res.json({status: "organization"});
                    
                    } else {
                    console.log("fail password for orgs");
                    res.json({status: "fail"});
                    }
                }
            });
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
});

app.get("/getRestaurants", function(req, res) {
  const array = [];
    con.query("SELECT id, name, address FROM restaurant_registration WHERE id in (SELECT res_id FROM menu WHERE available = 1)", function(err,rows,fields) {
      if(err) {
        res.json({status: "fail"});
        throw err;
      }
      else {
        if (rows.length == 0) {
            console.log("No entries found in restaurants");
            res.json({status: "fail"});
        } else {
            for (let i = 0; i < rows.length; i++) {
              array.push(rows[i]);
            }
        }
        res.json({restaurants: array});
      }
    })
});

app.get("/getMenu/:resID", function (req, res) {
  const array = [];
  con.query("SELECT * FROM menu WHERE available = 1 and res_id = ?", [resID], function(err,rows,fields) {
    if (err) {
      throw err;
    } else {
      if (rows.length ==0) {
        console.log("No menu found for that restaurant");
        res.json({status: "fail"});
      } else {
        for (let i = 0;i < rows.length; i++) {
          if (available == 1) {
            array.push({item: rows[i].item, servings: rows[i].servings, ingredients: rows[i].ingredients, available: rows[i].available});
          }
          
        }
      }
      res.json({menu: array});
    }
  })
});

app.post("/postMenu", function (req, res) {
  let menu = req.body.menu;
  for (let i = 0; i < menu.length; i++) {
    con.query("INSERT INTO menu (item, ingredients) VALUES (?, ?)", [menu[i].item, menu[i].ingredients], function(err,rows,fields) {
      if(err) throw err;
            else {
              console.log("Inserted query!");
            }
        });
        res.json({status: "success"});
  }});

function registerAccount(req,res,reqBody, accType) {
    var name = reqBody.name;
    var address = reqBody.address;
    var username = reqBody.username;
    var password = reqBody.password; 
    var capacity = reqBody.capacity;
    if (accType == "restaurant") {
        con.query("INSERT INTO restaurant_registration (username, password, name, address) VALUES (?, ?, ?, ?)", [username, password, name, address],
        function(err) {
            if(err) throw err;
            else {
              console.log("Inserted query!");
            }
        });
        res.json({status: "success"});
    } else if (accType == "organization") {
        capacity= reqBody.capacity;
        con.query("INSERT INTO org_registration (username, password, name, address, occupancy) VALUES (?, ?, ?, ?, ?)", [username, password, name, address, capacity],
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