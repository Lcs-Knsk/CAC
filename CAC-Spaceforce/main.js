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



function GameLoop(){
    //reset screen
    ctx.drawImage(Background, 0, 0, 1000, 600);

    //Do the character thing
    char.Logic();

    //Run meteors 
    for(var i = 0; i < MeteorsVar.length; i++){
        MeteorsVar[i].Logic();
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
    for(var i = 0; i < 600; i += 100){
        var NewThing = new Meteors(i);
        MeteorsVar.push(NewThing);
    }
    setInterval(GameLoop, 10);

}
