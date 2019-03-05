
function dice(){
  var dice=Math.random();
  while(dice>0.7 || dice <=0.09){
      dice=Math.random();
  }
  dice=Math.floor(dice*10);
  return dice;
}
function setpic(dice,player){
  if(dice==1){
    if(player==1){document.querySelector(".img1").setAttribute("src","images\\dice1.png");}
    else{document.querySelector(".img2").setAttribute("src","images\\dice1.png");}

  }
  if(dice==2){
    if(player==1){document.querySelector(".img1").setAttribute("src","images\\dice2.png");}
    else{document.querySelector(".img2").setAttribute("src","images\\dice2.png");}
  }
  if(dice==3){
    if(player==1){document.querySelector(".img1").setAttribute("src","images\\dice3.png");}
    else{document.querySelector(".img2").setAttribute("src","images\\dice3.png");}
  }
  if(dice==4){
    if(player==1){document.querySelector(".img1").setAttribute("src","images\\dice4.png");}
    else{document.querySelector(".img2").setAttribute("src","images\\dice4.png");}
  }
  if(dice==5){
    if(player==1){document.querySelector(".img1").setAttribute("src","images\\dice5.png");}
    else{document.querySelector(".img2").setAttribute("src","images\\dice5.png");}
  }
  if(dice==6){
    if(player==1){document.querySelector(".img1").setAttribute("src","images\\dice6.png");}
    else{document.querySelector(".img2").setAttribute("src","images\\dice6.png");}
  }
}
function compare(dice1,dice2){
  if(dice1>dice2){
    return "player 1 win";
  }
  else if(dice2 > dice1){return "player2 win";}
  else{
    return "draw";
  }

}
var dice1 = dice();
var dice2 = dice();
console.log(dice1);
console.log(dice2);
document.querySelector("h1").innerText=compare(dice1,dice2);
setpic(dice1,1);
setpic(dice2,2);
