const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

var Background = new Image();
Background.src = "Art/background.jpg"

var MeteorImage;

var Achieved = new Audio("Sfx/AchieveMedal.wav")

var char;
var KeysDown = {
    W: false,
    S: false,
    Up: false,
    Down: false,
}

var MeteorsVar = [];
var MeteorSpeed = 3;
var AdditionToMeteorSpeed = 0.001;
var MaxSpeed = 8;

var Score = 0;

var AchievedCgPin = false;
var FirstTimeAchieved = true;

var AchievedPin = new Image();
AchievedPin.src = "Art/SpaceForcePin.png"
var NotAchievedPin = new Image();
NotAchievedPin.src = "Art/NotGottenPin.png"






function GameLoop(){
    //reset screen
    ctx.drawImage(Background, 0, 0, 1000, 600);
    if(char.Alive){
        //Do the character thing
        char.Logic();

        //Run meteors 
        for(var i = 0; i < MeteorsVar.length; i++){
            if(MeteorsVar[i].Main.X < -100){
                MeteorsVar.splice(i, 1);
            } 
            MeteorsVar[i].Logic();
        }



        if(MeteorSpeed < 8){
            MeteorSpeed += AdditionToMeteorSpeed;
        }
        else{
            MeteorSpeed = 8;
        }
    }
    else{
        ShowEndUI();
    }



    ShowScore();

}

function ShowEndUI(){
    //Draw End screen
    //Blue Back Ground with black outsides
    ctx.fillStyle = "rgb(113, 121, 126)";
    ctx.fillRect(222, 150-47.25, 555, 300+47.25*2)
    ctx.fillStyle = "black";
    //top line
    ctx.fillRect(222, 150-47.25, 11, 300);
    //right line
    ctx.fillRect(222, 150-47.25, 555, 11);
    //bottom line
    ctx.fillRect(222, 439-47.25, 555, 11);
    //right line
    ctx.fillRect(766, 150-47.25, 11, 300);
    //middle line
    ctx.fillRect(222, 297-47.25, 555, 6);
    //Bottom middle line
    ctx.fillRect(495, 303-47.25, 6, 147);

    //Draw the "Hit space to play button"
    ctx.fillStyle = "red";
    ctx.fillRect(233, 161-47.25, 533, 136);

    //Draw Plat Button
    ctx.fillStyle = "black"
    ctx.font = "40px Trebuchet MS";
    ctx.fillText("Press space to play again", 270, 240-47.25);

    //Show score
    ctx.font = "40px Trebuchet MS";
    ctx.fillStyle = "black"
    ctx.fillText("Score: " + Score, 275, 360-47.25);

    if(Score > 19){
        sessionStorage.setItem("Spaceforce", true)
        AchievedCgPin = true;
        if(FirstTimeAchieved) Achieved.play();
        FirstTimeAchieved = false;

    }


    //Show score goal
    ctx.fillText("Goal: 20", 275, 410-47.25);

    //Show "esc to map"
    ctx.fillStyle = "black";
    ctx.lineWidth = 11;
    ctx.strokeRect(227.5, 444.5-47.25, 544, 94.5);
    
    ctx.fillText("Esc to go back to map", 310, 506-47.25)

    //draw badge
    if(AchievedCgPin){ 
        ctx.drawImage(AchievedPin, 540, 310-47.25, 180, 120)
    }
    else{
        ctx.drawImage(NotAchievedPin, 540, 310-47.25, 180, 120)
    }
}


function ShowScore(){
    ctx.font = "40px Trebuchet MS";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + Score, 50, 50)
}


function SpawnNewMeteors(){
    //FIX UP THIS THING
    var tempNum = Math.random();

    if(tempNum > .2){
    //If wall occurs
    var tempNum = Math.random();
    if(tempNum > 0.75){
            //top
            var NewThing = new Meteors(0, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(180, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(240, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(300, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(360, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(420, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(480, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(540, MeteorSpeed);
            MeteorsVar.push(NewThing);
        }
        else if(tempNum > 0.5){
            //top-mid
            var NewThing = new Meteors(0, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(60, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(120, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(300, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(360, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(420, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(480, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(540, MeteorSpeed);
            MeteorsVar.push(NewThing);
        }
        else if(tempNum > 0.25){
            //bot-mid
            var NewThing = new Meteors(0, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(60, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(120, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(180, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(240, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(420, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(480, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(540, MeteorSpeed);
            MeteorsVar.push(NewThing);
        }
        else{
            //bot
            var NewThing = new Meteors(0, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(60, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(120, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(180, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(240, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(300, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(360, MeteorSpeed);
            MeteorsVar.push(NewThing);
            var NewThing = new Meteors(540, MeteorSpeed);
            MeteorsVar.push(NewThing);
        }
    }
    else{
        //detect which level you are at
        var random = Math.random()*540;
        var NewThing = new Meteors(random, MeteorSpeed);
        MeteorsVar.push(NewThing);
        var random = Math.random()*540;
        var NewThing = new Meteors(random, MeteorSpeed);
        MeteorsVar.push(NewThing);
        var random = Math.random()*540;
        var NewThing = new Meteors(random, MeteorSpeed);
        MeteorsVar.push(NewThing);
        var random = Math.random()*540;
        var NewThing = new Meteors(random, MeteorSpeed);
        MeteorsVar.push(NewThing);
    }


    if(char.Alive){
        Score++;
    }
}

function Reset(){
    char;
    KeysDown = {
        W: false,
        S: false,
        Up: false,
        Down: false,
    }

    MeteorsVar = [];
    MeteorSpeed = 3;
    AdditionToMeteorSpeed = 0.001;
    MaxSpeed = 8;

    Score = 0;
    char = new Character();
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.key == "W" || e.key == "w" || e.keyCode == 38){
        KeysDown.W = true;
    }
    if(e.key == "S" || e.key == "s" || e.keyCode == 40){
        KeysDown.S = true;
    }
    if(e.key == " " && !char.Alive){
        Reset();
    }
    if(e.key == "Escape" && !char.Alive){
        console.log("hit back")
        history.go(-1);
    }   
}

function keyUpHandler(e){
    if(e.key == "W" || e.key == "w" || e.keyCode == 38){
        KeysDown.W = false;
    }
    if(e.key == "S" || e.key == "s" || e.keyCode == 40){
        KeysDown.S = false;
    }
}


window.onload = function(){
    MeteorImage = new Image();
    MeteorImage.src = "Art/MeteorsLOL.png"
    char = new Character();
    setInterval(GameLoop, 10);
    setInterval(SpawnNewMeteors, 1500)

}
