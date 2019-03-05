
var buttoncolour=["red","blue","green","yellow"];
var colourlist=[];
var userClicklist=[];
var start = false;
var level = 0;

$(document).keypress(function() {
  if (event.key = "enter") {

    if (!start) {
      $("#level-title").text("level " + level);
      start = true;
    }

  }
});

$(".btn").click(function(){
var pressed=$(this).attr("id");
userClicklist.push(pressed);

playsound();
animatePress();

checkAnswer(userClicklist.length-1);
})
