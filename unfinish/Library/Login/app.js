//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.render("login");
});
app.post("/SignUp",function(req,res){
    var username = req.body.Username;
    var password = req.body.Password;

    console.log("SignUp"+username);
    console.log("SignUp"+password);
});

app.post("/login",function(req,res){
    var username = req.body.Username;
    var password = req.body.Password;
    console.log("login"+username);
    console.log("login"+password);


});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
