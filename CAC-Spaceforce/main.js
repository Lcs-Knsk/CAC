const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext("2d");

var Background = new Image();
Background.src = "Art/background.jpg"

var MeteorImage;

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




function GameLoop(){
    if(char.Alive){
        //reset screen
        ctx.drawImage(Background, 0, 0, 1000, 600);

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
        //ShowEndUI
    }



    ShowScore();

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

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e){
    if(e.key == "W" || e.key == "w"){
        KeysDown.W = true;
    }
    if(e.key == "S" || e.key == "s"){
        KeysDown.S = true;
    }
}

function keyUpHandler(e){
    if(e.key == "W" || e.key == "w"){
        KeysDown.W = false;
    }
    if(e.key == "S" || e.key == "s"){
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
