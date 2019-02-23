//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const findOrCreate = require("mongoose-findorcreate");
const fs = require("fs");
const port = 3000;


var app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/InstapicDB", {useNewUrlParser: true});

const publicationSchema = new mongoose.Schema({
  pictureDir: String,
  publicationDate: Date,
  publicationPlace: String,
  publicationTime: String,
  likeOrNot: Boolean,
  comment: String,
});

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  googleId: String,
  facebookId: String,
  published: [publicationSchema],
  isActive: Boolean,
  shared: [publicationSchema],
});



const User = new mongoose.model("User", UserSchema);
const Publications = new mongoose.model("Publication", publicationSchema);

const published1 = new Publications({
  pictureDir: "images/ib3.jpg",
  publicationPlace: "Los Angeles",
  publicationTime: "00:02",
  likeOrNot: true,
  comment: "What an awesome actress wow"
});

const user1 = new User({
  username: "inbard",
  email: "inbard@admin.com",
  password: "inbard123",
  published: [published1],
  isActive: true,
});

// published1.save();
// user1.save();



app.get("/", function(req, res){

  User.find({}, function(err, found){
    Publications.find({}, function(error, found1){

      if(err){
        console.log(err);
      }else{
        res.render('home', {UsersInfos1: found1});
      }
    });
  });

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
