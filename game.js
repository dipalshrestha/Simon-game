
var buttonColors = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

// starting the game
$(document).keypress(function(){
    if (!started){
      nextSequence();
      started = true;
    }
  });

function nextSequence() {
  userClickedPattern=[];
  level++;
  $("#level-title").text("level "+ level);
  var randomNumber = Math.floor(Math.random() * 4);


var randomChosenColor = buttonColors[randomNumber];
gamePattern.push(randomChosenColor);

$("#" + randomChosenColor).fadeOut(150).fadeIn(150);
playSound(randomChosenColor);
}
// recording the user clicking.

$(".btn").click(function (){
  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});

//checking userpattern with game pattern
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]){
    console.log("success");

  if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
}
  else{
    console.log("wrong");
    playSound("wrong");
    $('body').addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  console.log(userClickedPattern);
  console.log(gamePattern);
}
//start over function
function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
//play sound
function playSound(name){
  var audio = new Audio ("sounds/" + name + ".mp3");
  audio.play();
}
//animate button clicked.
function animatePress(currentColor){
  $("." + currentColor).addClass("pressed");
  setTimeout(function () {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
