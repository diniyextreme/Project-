//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.set("view engine",'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  var today =new Date();
  var option={weekday:'long'};
  var day = today.toLocaleDateString("En-us" ,{weekday:'long'});
  var currentdate = today.getDay();

  /**if(currentdate == 0){
    day="sunday";
    //res.sendfile(__dirname+"/weekend.html");
  }
  else if(currentdate == 1){
    day="Monday";
    //res.sendfile(__dirname+"/weekend.html");
  }
  else if(currentdate == 2 ){
    day="Tuesday";
    //res.sendfile(__dirname+"/weekend.html");
  }
  else if(currentdate == 3){
    day="Wednesday";
    //res.sendfile(__dirname+"/weekend.html");
  }
  else if(currentdate == 4){
    day="Thursday";
    //res.sendfile(__dirname+"/weekend.html");
  }
  else if(currentdate == 5){
    day="Friday";
    //res.sendfile(__dirname+"/weekend.html");
  }
  else{
    day="Saturday";
    //res.sendfile(__dirname+"/weekend.html");
  } **/
  res.render("list",{KindOfDay:day});

});


  app.post("/",function(req,res){
    console.log(req.body.newItem);

});

app.post("/test",function(req,res){
  console.log(req.body.newItem);

});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});
