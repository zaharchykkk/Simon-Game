let buttonColours = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let pressed = false;
let lvl = 0;

$(".start-button").click(function() {
    $("h1").text("Level " + lvl);

    if(!pressed){
        nextSequence();
        pressed = true;
      }
});

let nextSequence = () => {
    lvl++;
    userClickedPattern = [];

    $("h1").text("Level " + lvl)

    let randomNumber = Math.floor(Math.random() * 4);

    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
};

$(".btn").click(function() {

    let userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.lastIndexOf(userChosenColour));

});

let animatePress = (currentColor) => {
    $("#" + currentColor).addClass("pressed");
    setTimeout(() => {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
};

let playSound = (name) => {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};   


let checkAnswer = (currentLevel) => {

    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){

      let count = 0;

      for (let i = 0; i < gamePattern.length; i++) {
        if(gamePattern[i] === userClickedPattern[i]){
          count++;
        }
      }

      if(count === gamePattern.length){
        console.log("success");
        setTimeout(function(){
            nextSequence();
          }, 1000);
      }

    } else {
      playSound("wrong");

      $("body").addClass("game-over");
      setTimeout(() => {
        $("body").removeClass("game-over");
        }, 300);
      
      $("h1").html("Game Over!<br/> Press Button to Restart")

      startOver();
    }
}      

let startOver = () => {
    lvl = 0;
    gamePattern = [];
    pressed = false;
};







