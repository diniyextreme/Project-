/**
h1 path
document.querySelector("h1").innerText="test"
**/
//all the var needed
var colourlist = [];
colourlist=["R","G","B","Y"];
userClicklist=[];

var start=false;
var level=0;
var i =0;
var u=0;
starts();

//main function
function starts(){


//run level
levels();
}


/**
Immediate Invoking Function Expression(IIFE)-add delay between loop
for (var i = 0; i < 5; i++) {
  (function (i) {
    setTimeout(function () {
      alert("hello");
    }, 3000*i);
  })(i);
};
**/


function testlevel(){
  if(colourlist[i]=="R"){
    $("#red").fadeOut(1000).fadeIn(1000);
  }
  else if(colourlist[i]=="G"){
    $("#green").fadeOut(1000).fadeIn(1000);
  }
  else if(colourlist[i]=="B"){
    $("#blue").fadeOut(1000).fadeIn(1000);
  }
  else if(colourlist[i]=="Y"){
    $("#yellow").fadeOut(1000).fadeIn(1000);
  }
}


//level

function levels(){
for(var i=0;i<colourlist.length;i++){
    setTimeout(function () {
  if(colourlist[i]=="R"){
    $("#red").fadeOut(1000).fadeIn(1000);
  }
  else if(colourlist[i]=="G"){
    $("#green").fadeOut(1000).fadeIn(1000);
  }
  else if(colourlist[i]=="Y"){
    $("#blue").fadeOut(1000).fadeIn(1000);
  }
  else{
    $("#yellow").fadeOut(1000).fadeIn(1000);
  }

}, 900);
}
}

//capture button event + user click aray
  $(".btn").click(function(){
    $(this).fadeOut(100).fadeIn(100);
    if(event.target.id === "red"){
      userClicklist.push("R");
    }
    if(event.target.id === "green"){
      userClicklist.push("G");
    }
    if(event.target.id === "yellow"){
      userClicklist.push("Y");
    }if(event.target.id === "blue"){
      userClicklist.push("B");
    }

  });


//time to run random
function timeToRun(time){

for(var i=0;i<time;i++){
  random();
}}

//insert array
function random(){
    var rand=Math.random();
    rand=Math.floor(rand*10);


    if(rand<=2.5){
      colourlist.push("R");
    }
    else if(rand>=2.6 && rand<=5){
      colourlist.push("G");
    }
    else if(rand>=5.1 && rand<=7.5){
      colourlist.push("B");
    }
    else{
      colourlist.push("Y");
    }
    level++;
    $("#level-title").text("Level "+level);
}


//testing each array
addEventListener("keypress",function(info){
  handleclick(info.key);
});

//capture keyboard key event
function handleclick(key) {

if(key == "p"){
alert(userClicklist);
}
else if(key == "o"){
alert(colourlist);
}
else if(key = "enter"){
  $("#level-title").text("Level 1");
  random();
//  runlevel();
//  u++;
//  i++;
}
}


//check checkAnswer
function checkAnswer(level){
  if (colourlist[level] === userClicklist[level]) {

      console.log("success");

      if (userClicklist.length === colourlist.length){
        setTimeout(function () {
          random();
        }, 1000);
      }

    } else {

      console.log("wrong");

      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      //2. Call startOver() if the user gets the sequence wrong.
      startOver();
    }
}
function runlevel(){
  setTimeout(function run(){
    testlevel(i);
    setTimeout(run,1000);
  },1000);
}
