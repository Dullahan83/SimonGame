var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0

var isStarted = false
var canClick = false

function nextSequence(){
    userClickedPattern = [];
    level++;
    canClick = false
    $("h1").text("Level " + level)
    var randomNumber = Math.floor((Math.random() * 4))
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    if (gamePattern.length > 0) {
        flashTouch(gamePattern)
    }
    else{
        $("#" + randomChosenColor).fadeOut(100).fadeIn(100)
    }
    playSequence()
    setTimeout(function(){
        canClick = true
    }, 500 * gamePattern.length);
}

function playSequence(){
    for (let i = 0; i < gamePattern.length; i++) {
        var timer = 500 * i;
        setTimeout(function(){
            playSound(gamePattern[i])
        }, timer)
    }
}

function flashTouch(gamePattern){
    for (let i = 0; i < gamePattern.length; i++) {
        var timer = 500 * i;
        setTimeout(function(){
            $("#" + gamePattern[i]).fadeOut(100).fadeIn(100)
        }, timer)
    }
}

function playSound(name){
    var audio = new Audio("./sounds/" + name + ".mp3")
    audio.play()
}

function animatePress(currentColour){
    $("." + currentColour).addClass("pressed")
    setTimeout(() => {
        $("." + currentColour).removeClass("pressed")
    }, 100);
}
function startOver(){
    level = 0;
    gamePattern = [];
    isStarted = false
}

function checkAnswer(currentLevel){   
    if(userClickedPattern[currentLevel - 1] === gamePattern[currentLevel - 1]){
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(nextSequence, 1000)
        }
    }
    else{
        playSound("wrong")
        $("body").addClass("game-over")
        setTimeout(() => {$("body").removeClass("game-over")}, 200)
        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
        canClick = false;
    }
}
$(document).ready(()=> {
    $(document).keypress(function(){
        if(!isStarted){
            $("h1").text("Level " + level)
            nextSequence();
            playSound(gamePattern[0])
            isStarted = true
        }
    })
    
    $(".btn").click(function(e){
        if (canClick) {
            var userChosenColour = $(this).attr("id")
            userClickedPattern.push(userChosenColour);
            playSound(userChosenColour)
            animatePress(userChosenColour)
            if(userClickedPattern.length === level){    
                checkAnswer(level)
            }
            else{
                checkAnswer(userClickedPattern.length)
            }
        }  
    })
})





