//jshint esversion:6

const express = require("express");

const app = express();

app.get("/",function(request, response){
  response.send("hello")
  //console.log(request);
})
app.get("/test",function(request, response){
  response.send("This is a test")
  //console.log(request);
})

app.listen(3000,function(){
  console.log("Server Started on Port 3000");
});
