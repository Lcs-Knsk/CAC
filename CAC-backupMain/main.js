const canvas = document.getElementById("gameScreen");
const ctx = canvas.getContext('2d');

var char;
var MenuStand;

var Mouse = {
    X: 0, 
    Y: 0,
}

function GameLoop(){
    //reset & background
    ctx.fillStyle = "#87ceeb"
    ctx.fillRect(0, 0, 1000, 600);

    ShowBackground();

    //characters
    char.Loop();
    
    //player stand
    MenuStand.Logic();


    //draw badges on top of screen

}

function ShowBackground(){
    ctx.fillStyle = "#3e802b";
    ctx.fillRect(0, 550, 1200, 150);

    ctx.fillStyle = "#875514";
    ctx.fillRect(0, 570, 1200, 150);
}

function SetPlayerFrameRow(){
    if(char.Anim.Animate){
        if(char.Anim.FrameNumber == char.Anim.HighFrameNumber - 1){
            char.Anim.FrameNumber = 0;
        }
        else{
            char.Anim.FrameNumber++;
        }
    }
}

window.onload = new function(){
    //starts the gameloop
    char = new Character(30, 500)
    MenuStand = new MilitaryStandThing();
    setInterval(GameLoop, 10);
    setInterval(SetPlayerFrameRow, 300)
    
}

window.addEventListener('mousemove', (event) => {
    Mouse.X = event.clientX;
    Mouse.Y = event.clientY;
})

//#region Key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousedown", mouseDownHandler, false);

function mouseDownHandler(){
    //Check if hit pin
    MenuStand.CheckIfHitPin();
}


//turns on all of the movement for the player
function keyDownHandler(e){
    //Player keys
    if(e.key == "d" || e.key == "D"){
        if(!MenuStand.InMenu){
            char.KeysDown.D = true;

            if(char.KCombo[0] == "nothing"){
                char.KCombo[0] = "right"
                if(char.KCombo[2] == "nothing"){
                    char.KCombo[2] = "XMove"
                }
            }
        }

    }

    if(e.key == "a" || e.key == "A"){
        if(!MenuStand.InMenu){
        char.KeysDown.A = true;

        if(char.KCombo[0] == "nothing"){
            char.KCombo[0] = "left"
            if(char.KCombo[2] == "nothing"){
                char.KCombo[2] = "XMove"
            }
        }
        }
    }

    if(e.key == "e" || e.key == "E"){
        if(MenuStand.Colliding && !MenuStand.InMenu){
            console.log("In menu")
            MenuStand.InMenu = true;
        }
    }

}

//turns off all of the movement things when the key is let go
function keyUpHandler(e){
    //Player keys
    if(e.key == "d" || e.key == "D" && !MenuStand.InMenu){

        char.KeysDown.D = false;

        if(char.KCombo[0] == "right"){
            if(char.KeysDown.A){
                char.KCombo[0] = "left";
            }
            else{
                char.KCombo[0] = "nothing";
                if(char.KCombo[1] != "nothing"){
                    char.KCombo[2] = "YMove";
                }
                else if(char.KCombo[2] == "XMove"){
                    char.KCombo[2] = "nothing";

                    char.Anim.FrameNumber = 1;
                }
            }
            
            
        }
    }
    if(e.key == "a" || e.key=="A" && !MenuStand.InMenu){

        char.KeysDown.A = false;

        if(char.KCombo[0] == "left"){
            if(char.KeysDown.D){
                char.KCombo[0] = "right";
            }
            else{
                char.KCombo[0] = "nothing";
                    
                if(char.KCombo[1] != "nothing"){
                    char.KCombo[2] = "YMove";
                }
                else if(char.KCombo[2] == "XMove"){
                    char.KCombo[2] = "nothing";
                    char.Anim.FrameNumber = 1;
                }
            }

        }
    }
}


//#endregion