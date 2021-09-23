const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');

var Imap = new IslandMap;


//this is the main loop the game will keep running
function GameLoop(){
    //reset screen
    ctx.clearRect(0,0, 1000, 600);
    Imap.DrawMap();


    //runs all of the character functions
    char.Loop()




    //update score



}

//first thing to run after the window loads, also starts the game loop
window.onload = new function(){
    //innitializes all of the classes and the map
    InnitEverything();

    //starts the gameloop
    setInterval(GameLoop, 10);
    
    //starts the player animation loop||PROBABLY A BETTER WAY TO DO THIS
    setInterval(SetPlayerFrameRow, 150);

}



//Sets what frame the animation is on
//runs ever 300ms
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

        char.KeysDown.D = true;

        if(char.KCombo[0] == "nothing"){
            char.KCombo[0] = "right"
            if(char.KCombo[2] == "nothing"){
                char.KCombo[2] = "XMove"
            }
        }
    }

    if(e.key == "a" || e.key == "A"){

        char.KeysDown.A = true;

        if(char.KCombo[0] == "nothing"){
            char.KCombo[0] = "left"
            if(char.KCombo[2] == "nothing"){
                char.KCombo[2] = "XMove"
            }
        }
    }

    if(e.key == "w" || e.key == "W"){

        char.KeysDown.W = true;

        if(char.KCombo[1] == "nothing"){
            char.KCombo[1] = "up"
            if(char.KCombo[2] == "nothing"){
                char.KCombo[2] = "YMove"
            }
        }
    }

    if(e.key == "s" || e.key == "S"){

        char.KeysDown.S = true;

        if(char.KCombo[1] == "nothing"){
            char.KCombo[1] = "down"
            if(char.KCombo[2] == "nothing"){
                char.KCombo[2] = "YMove"
            }
        }
    }


}

//turns off all of the movement things when the key is let go
function keyUpHandler(e){
    //Player keys
    if(e.key == "d"){

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
    if(e.key == "a"){

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

    if(e.key == "w"){

        char.KeysDown.W = false;

        if(char.KCombo[1] == "up"){
            if(char.KeysDown.S){
                char.KCombo[1] = "down";
            }
            else{
                char.KCombo[1] = "nothing";
                if(char.KCombo[0] != "nothing"){
                    char.KCombo[2] = "XMove";
                }
                else if(char.KCombo[2] == "YMove"){
                    char.KCombo[2] = "nothing";
                    char.Anim.FrameNumber = 1;
                }
            }


        }
    }

    if(e.key == "s"){

        char.KeysDown.S = false;

        if(char.KCombo[1] == "down"){
            if(char.KeysDown.W){
                char.KCombo[1] = "up";
            }
            else{
                char.KCombo[1] = "nothing";
                
                if(char.KCombo[0] != "nothing"){
                    char.KCombo[2] = "XMove";
                }
                else if(char.KCombo[2] == "YMove"){
                    char.KCombo[2] = "nothing";
                    char.Anim.FrameNumber = 1;
                }
            }

        }
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


