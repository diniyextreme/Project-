//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields:{
        FNAME:firstName,
        LNAME:lastName
      }
    }]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us20.api.mailchimp.com/3.0/lists/8ddd363368",
    method: "POST",
    headers: {
      "Authorization": "diniyextreme 64973be41a2153c9124cab3613594c44-us20"
    },
    body: jsonData
  };

  request(options, function(error, response, body) {
    if (error) {
      res.send("There was an error during the process if signing up");
    } else {
      if(response.statusCode===200){
        res.sendFile(__dirname + "/success.html");;
      console.log(response.statusCode);}
    else{res.sendFile(__dirname + "/failure.html");;
  }
  }

  });
});
  app.listen(3000, function() {
    console.log("server started at port 3000");
  });






//64973be41a2153c9124cab3613594c44-us20

//listid - - -  8ddd363368
