//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.use(express.static("public"));
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));

mongoose.connect("mongodb://localhost:27017/inventory",{useNewUrlParser:true});

const userSchema = new mongoose.Schema({
  name:String,
  password:Number,
  level:String
});

const User = mongoose.model("User",userSchema);

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";



app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signin.html");
});
app.get("/home", function(req, res){
  res.render("home",{HSC:homeStartingContent});
});

app.post("/",function(req,res){
  const username = req.body.username;
  const password = req.body.password;
  console.log("posted");
  User.findOne(function(err,userFound){
    if(userFound.name ==username){
      if(userFound.password ==password){
        res.render("home",{HSC:homeStartingContent});
      }
      else{
        console.log(userFound.password);
        console.log(password);
      }
    }
    else{
      console.log("NO Account");
    }
  });

});

  app.listen(3000, function() {
    console.log("server started at port 3000");
  });
