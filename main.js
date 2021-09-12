const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');


//this is the main loop the game will keep running
function GameLoop(){
    //reset screen
    ctx.clearRect(0,0, 1000, 600);
    drawMap();


    //runs all of the character functions
    char.Loop()

    //enemy functions


    //update score



}

//first thing to run after the window loads, also starts the game loop
window.onload = new function(){
    //innitializes all of the classes and the map
    InnitEverything();

    //starts the gameloop
    setInterval(GameLoop, 16.6);
    
    //starts the player animation loop||PROBABLY A BETTER WAY TO DO THIS
    setInterval(SetPlayerFrameRow, 300);

}

var mapThing = new Image;
mapThing.src = "SpritesAndStuff/cacTrueMap.png" 
function drawMap(){
    ctx.drawImage(mapThing, 400, 400, 400, 400, 0, 0, 800, 800);
}


//Sets what frame the animation is on
//runs ever 300ms
function SetPlayerFrameRow(){
    if(char.Anim.FrameNumber == char.Anim.HighFrameNumber - 1){
        char.Anim.FrameNumber = 0;
    }
    else{
        char.Anim.FrameNumber++;
    }
}

//#region Global Variables
char;


//#endregion

//#region Key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


//turns on all of the movement for the player
function keyDownHandler(e){
    //Player keys
    if(e.key == "d" || e.key == "D"){
        char.Move.Right = true;
    }

    if(e.key == "a" || e.key == "A"){
        char.Move.Left = true;
    }

    if(e.key == "w" || e.key == "W"){
        char.Move.Up = true;
    }

    if(e.key == "s" || e.key == "S"){
        char.Move.Down = true;
    }


}

//turns off all of the movement things when the key is let go
function keyUpHandler(e){
    //Player keys
    if(e.key == "d"){
        char.Move.Right = false;
    }
    if(e.key == "a"){
        char.Move.Left = false;
    }

    if(e.key == "w"){
        char.Move.Up = false;
    }

    if(e.key == "s"){
        char.Move.Down = false;
    }
}


//#endregion

//#region Innitializers


function InnitEverything(){
    InnitChar();
}


function InnitChar(){
    char = new Character(400, 300);
}


//#endregion

