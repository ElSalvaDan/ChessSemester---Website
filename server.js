const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mysql = require("mysql");
/*const nodemailer = require("nodemailer");*/

const app = express();
const mysqlConn = require("./mysqlConn");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set("view engine", "ejs");
app.set("views", "views");
app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("home", { title: "Home" });
});

app.get("/register", (req, res) => {
    res.render("register", { title: "Registration" });
});

app.post("/register", (req, res) => {
    function HashingProcess(pass) {
        var userData = {
            username: req.body.Username,
            password: pass,
            email: req.body.Email,
            birthday: req.body.Birthday,
            status: req.body.Status
        };

        mysqlConn.query("INSERT INTO test SET ?", userData, (err, result) => {
            if (err) {
                console.log("Data did not successfully insert...");
            } else {
                /*transporter.sendMail(mailingInfo, (error, info) => {
                    if(error) { console.log(error); }
                    else { res.send("Your mail has been sent successfully, yay :)."); }
                });*/

                console.log("Data inserted successfully... ");
            }
        });
    }
    console.log(req.body.Password);
    bcrypt.hash(req.body.Password, 10, (err, hash) => {
        if (err) {
            console.log(err);
        } else {
            HashingProcess(hash);
        }
    });
});

app.listen(HTTP_PORT, () => {
    console.log("PORT: " + HTTP_PORT);
});
