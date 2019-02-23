//jshint esversion:6

const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
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

const userSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  username: String,
  email: String,
  password: String,
  first_name: String,
  last_name: String,
  last_ip: String,
  date_created: Date,
  date_updated: Date,

});

const photoSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  caption: String,
  latitude: Number,
  longitude: Number,
  image_path: String,
  images_size: Number,
  date_created: Date,
  date_updated: Date,
});

const commentSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  comment: String,
});

const photos_commentSchema = new mongoose.Schema({
  photo_id: { type: Schema.Types.ObjectId, ref: "Photo" },
  comment_id: { type: Schema.Types.ObjectId, ref: "Comment" },
});

const hashtagSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  hastag: String,
});

const photos_hashtagSchema = new mongoose.Schema({
  photo_id: { type: Schema.Types.ObjectId, ref: "Photo" },
  hashtag_id: { type: Schema.Types.ObjectId, ref: "Hashtag" },
});

const likeSchema = new mongoose.Schema({
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
  photo_id: { type: Schema.Types.ObjectId, ref: "Photo" },
  date_created: Date,
  date_updated: Date,
});

const tagSchema = new mongoose.Schema({
  _id: Schema.Types.ObjectId,
  name: String,
});

const photos_tagSchema = new mongoose.Schema({
  photo_id: { type: Schema.Types.ObjectId, ref: "Photo" },
  tag_id: { type: Schema.Types.ObjectId, ref: "Tag" },
});

const User = new mongoose.model("User", userSchema);
const Photo = new mongoose.model("Photo", photoSchema);
const Comment = new mongoose.model("Comment", commentSchema);
const Photos_comment = new mongoose.model("Photos_comment", photos_commentSchema);
const Hashtag = new mongoose.model("Hashtag", hashtagSchema);
const Photos_hastag = new mongoose.model("Photos_hastag", photos_hashtagSchema);
const Like = new mongoose.model("Like", likeSchema);
const Tag = new mongoose.model("Tag", tagSchema);
const Photos_tag = new mongoose.model("Photos_tag", photos_tagSchema);


const user0 = new User({
  _id: new mongoose.Types.ObjectId(),
  username: "Codioz",
  email: "admin@codioz.net",
  password: "admin123",
  first_name: "Aliou",
  last_name: "Souare",
  last_ip: "168.175.208.25",
});

const photo0 = new Photo({
  _id: new mongoose.Types.ObjectId(),
  user_id: user0._id,
  caption: "No caption",
  latitude: 12.624845,
  longitude: 12654.55423,
  image_path: "images/ib3.jpg",
  images_size: 800,
});

const comment0 = new Comment({
  _id: new mongoose.Types.ObjectId(),
  comment: "Quel belle actrice"
});

const phot0_comment0 = new Photos_comment({
  photo_id :photo0._id,
  comment_id: comment0._id,
});

const like0 = new Like({
  user_id: user0._id,
  photo_id: photo0._id,
});

// user0.save();
// photo0.save();
// comment0.save();
// phot0_comment0.save();
// like0.save();

app.get("/", function(req, res){

  Photo.find({}, function(err, found){

    if(err){
      console.log(err);
    }else{
      res.render("home", {picture: found});
    }
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
