//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const port = 3000;

var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/InstapicDB", {useNewUrlParser: true});

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googleId: String,
  facebookId: String,
});

const User = new mongoose.model("User", UserSchema);

const user1 = new User({
  username: "admin",
  email: "admin@admin.com",
  password: "admin123",
});

// user1.save();


app.get("/", function(req, res){
  res.render("home");
});

app.get("/profile", function(req, res){
  res.render("profile");
});




app.post("/", function(req, res){
  res.render("home");
});

app.listen(port, () => {
  console.log("The server is running on port " + port);
});
