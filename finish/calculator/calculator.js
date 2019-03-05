//jshint esversion:6

const express = require("express");

const app=express();

app.get("/",function(req,resp){
  resp.send("Hello World");
})


app.listen(3000,function(){
  console.log("Server Started on Port 3000");
});
