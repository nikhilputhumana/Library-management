const mysql = require("mysql");
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets", express.static("assets"));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "sample_forproj"
});

// connect to database
connection.connect(function(error){
    if (error) throw error
    else 
        console.log("Connection succesfull")
});

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
});

// authenticating
app.post("/", encoder, function(req, res){
    var username = req.body.username;
    var password = req.body.password;
    connection.query("select * from login_details where username = ? and password = ?", [username, password], function(error, results, fields){
        if (results.length > 0) {
            res.redirect("/Pages/library.html");
        } else {
            res.redirect("/");
        }
        res.end();
    });
});

// when login is success
app.get("/Pages/library.html", function(req, res){
    res.sendFile(__dirname + "/Pages/library.html")
});

// set app port
app.listen(4000);