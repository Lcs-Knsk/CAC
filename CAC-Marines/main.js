const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');

const Bluezy = new helpfulFunction();

var Targets = [];

var Score = 500;

var AllGone = false;

var AchievedCgPin = false;
var FirstTimeAchieved = true;

var MarinePin = new Image();
MarinePin.src = "Art/MarinePin.png";
var NotMarinePin = new Image();
NotMarinePin.src = "Art/NotGottenPin1.png";

var BackGround = new Image();
BackGround.src = "Art/background.png";

var Reload1 = new Audio("Sfx/Reload.wav");
var Achieved = new Audio('Sfx/AchieveMedal.wav');
var Shoot = new Audio("Sfx/ShootingBullets.wav");




//originally sets the game screen height and width
HEIGHT = 1000;
WIDTH = 600;


window.addEventListener('mousemove', (event) => {
    Char.topGun.mouse.x = event.clientX;
    Char.topGun.mouse.y = event.clientY;
})


function InnitChar(){
    Char = new Character();
}


function GameLoop(){
    if(!AllGone){
        ctx.drawImage(BackGround, 0, 0)

        //target movement + slider
        for(var i = 0; i < Targets.length; i++){
            Targets[i].Logic();
        }

        //char movement
        Char.Logic();

        //show score
        ShowScore();

        //Check if All gone
        var CheckAllGone = true;
        for(var i = 0; i < Targets.length; i++){
            if(Targets[i].health > 0){
                CheckAllGone = false;
            }
        }
        if(CheckAllGone){
            AllGone = true;
        }
    }
    else{
        //Show end ui
        ShowEndUI();

    }
}

function ResetGame(){
    Targets = [];
    Score = 500;
    AllGone = false;

    InnitChar();

    for(var i = 20; i < 981; i += 150){
        if(i != 470){ 
            var newThingThing = new TargetThings(i, 280)
            Targets.push(newThingThing);
        }
    }
}

function ShowEndUI(){
       //Draw End screen

    //reset screen
    ctx.fillStyle = "rgb(222, 184, 135)"
    ctx.fillRect(0, 0, 1000, 600);

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

    if(Score > 600){
        sessionStorage.setItem("Marines", true)
        AchievedCgPin = true;
        if(FirstTimeAchieved) Achieved.play();
        FirstTimeAchieved = false;

    }


    //Show score goal
    ctx.fillText("Goal: 520", 275, 410-47.25);

    //Show "esc to map"
    ctx.fillStyle = "black";
    ctx.lineWidth = 11;
    ctx.strokeRect(227.5, 444.5-47.25, 544, 94.5);
    
    ctx.fillText("Esc to go back to map", 310, 506-47.25)

    //draw badge
    if(AchievedCgPin){ 
        ctx.drawImage(MarinePin, 540, 310-47.25, 180, 120)
    }
    else{
        ctx.drawImage(NotMarinePin, 540, 310-47.25, 180, 120)
    }
}

function ShowScore(){
    //Calculate score
    //Show score
    ctx.font = "30px Trebuchet MS";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + Score, 450, 568)
}


window.onload = new function(){
    //innitializes the character
    InnitChar();

    for(var i = 20; i < 981; i += 150){
        if(i != 470){ 
            var newThingThing = new TargetThings(i, 280)
            Targets.push(newThingThing);
        }
    }




    //starts the gameloop
    setInterval(GameLoop, 16.6);
}




document.addEventListener("mousedown", mouseDownHandler, false);
document.addEventListener("keydown", keyDownHandler, false);


//#region key down and up handlers
function mouseDownHandler(){
    if(Char.CanShoot){
        var BulletThing = new Bullet(Char.topGun.rotation, Char.topGun.Gun.Mainx, Char.topGun.Gun.Mainy);
        Char.topGun.Gun.Bullets.push(BulletThing);

        Char.CanShoot = false;
        Shoot.play();
        Score -= 10;
    }

}

function keyDownHandler(e){
    if(e.key == " " || e.key == "" && AllGone){
        ResetGame();
    }

    if(e.key == "Escape" && AllGone){
        console.log("hit back")
        history.go(-1);
    }   

}



//#endregion




