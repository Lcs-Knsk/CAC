canvas = document.getElementById("gameScreen");
ctx = canvas.getContext("2d");

//Checks if the player has achieved the cg pin
var AchievedCgPin = sessionStorage.getItem("Coast Guard")

var char = [];
var GoFaster = false;

var people = [];

var AmountLeft = 25;
var touchingOne

var Timer = 0;

var CoastGuardPin = new Image();
CoastGuardPin.src = "Art/GottenPin.png";
var CoastGuardNotPing = new Image();
CoastGuardNotPing.src = "Art/NotGottenPin.png";
var FirstTimeAchieved = true;

var ScreenPos = {
    X: 0,
    Y: 0,
}

var BackGroundImg = new Image;
BackGroundImg.src = "Art/cgTHING.png";

var BackGroundBorder = {
    X: -3220,
    Y: -2380,
}

var OutSideBorder = {
    X: -1000,
    Y: -600,
}

var CollectPeople = false;
var CanCollectPeople = false;


var GamePlaying = true;

var Pickup = new Audio("Sfx/Pickup.wav");
var CantPickup = new Audio("Sfx/CantPickup.wav");
var Achieved = new Audio("Sfx/AchieveMedal.wav");
var HitBorder = new Audio("Sfx/HitBorder.wav");

var PlayAgain = new Audio("Sfx/PlayAgain.wav");



function Reset(){
    char = [];
    GoFaster = false;

    people = [];

    AmountLeft = 25;
    touchingOne

    Timer = 0;

    ScreenPos = {
        X: 0,
        Y: 0,
    }

    BackGroundImg = new Image;
    BackGroundImg.src = "Art/cgTHING.png";

    BackGroundBorder = {
        X: -3220,
        Y: -2380,
    }

    OutSideBorder = {
        X: -1000,
        Y: -600,
    }

    CollectPeople = false;
    CanCollectPeople = false;
    
    GamePlaying = true;


    char = new NavyCharacter(500, 300, true, 90);
    for(var i = 0; i < 25; i++){
        var newX = Math.floor(Math.random() * 1500) - 740;
        var newY = Math.floor(Math.random() * 1170) - 590;

        var newPerson = new SavePerson(newX, newY)
        people.push(newPerson)
    }

    FirstTimeAchieved = true;
}

function GameLoop(){
    //false = GamePlaying
    if(GamePlaying){
        ctx.drawImage(BackGroundImg, BackGroundBorder.X - ScreenPos.X, BackGroundBorder.Y + ScreenPos.Y, 6400, 4800)

        ctx.strokeRect( OutSideBorder.X - ScreenPos.X, OutSideBorder.Y + ScreenPos.Y, 2000, 1200);

        //Character Logic
        char.Logic();
        CheckPlayerCollision();

        //saving people and ships
        for(var i = 0; i < people.length; i++){
            people[i].Logic();
        }

        //UI
        ShowHowManyLeft();
        ShowSpaceBarAction();
        ShowTimer();
    }
    else{
        //Draw End UI
        ShowEndUI();
    }


    //Up timer
    if(AmountLeft > 0){
        Timer += 0.01;
    }
    if(AmountLeft == 0){
        GamePlaying = false;
    }

}

window.onload = new function(){
    char = new NavyCharacter(500, 300, true, 90);
    for(var i = 0; i < 25; i++){
        var newX = Math.floor(Math.random() * 1500) - 740;
        var newY = Math.floor(Math.random() * 1170) - 590;

        var newPerson = new SavePerson(newX, newY)
        people.push(newPerson)
    }

    setInterval(GameLoop, 10);
}

function CollectingFunction(){
    CollectPeople = true;
    CanCollectPeople = false;
}

function ShowEndUI(){
    ctx.drawImage(BackGroundImg, BackGroundBorder.X - ScreenPos.X, BackGroundBorder.Y + ScreenPos.Y, 6400, 4800)

    ctx.strokeRect( OutSideBorder.X - ScreenPos.X, OutSideBorder.Y + ScreenPos.Y, 2000, 1200);

    //Draw End screen
    ctx.GlobalAlpha = 0.002;
    ctx.fillStyle = "rgb(255, 255, 255, 0.3)"
    ctx.fillRect(0, 0, 1000, 600,);


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
    var ScoreAmount = 1000 - Timer.toPrecision(2);
    ctx.fillText("Score: " + ScoreAmount, 275, 360-47.25);

    if(ScoreAmount > 900){
        AchievedCgPin = true;
        if(FirstTimeAchieved){
            Achieved.play();
            sessionStorage.setItem("Coast Guard", true);
        }
        FirstTimeAchieved = false;

    }

    //Show score goal
    ctx.fillText("Goal: 900", 275, 410-47.25);

    //Show "esc to map"
    ctx.fillStyle = "black";
    ctx.lineWidth = 11;
    ctx.strokeRect(227.5, 444.5-47.25, 544, 94.5);
    
    ctx.fillText("Esc to go back to map", 310, 506-47.25)

    //draw badge
    if(sessionStorage.getItem("Coast Guard") == "true"){ 
        ctx.drawImage(CoastGuardPin, 540, 310-47.25, 180, 120)
    }
    else{
        ctx.drawImage(CoastGuardNotPing, 540, 310-47.25, 180, 120)
    }
}

function ShowHowManyLeft(){
    ctx.fillStyle = "white";
    ctx.font = "40px Trebuchet MS";
    ctx.fillText('Buoys Left: ' + AmountLeft + '/25', 650, 40);
}

function ShowTimer(){
    ctx.font = "40px Arial";
    ctx.fillStyle = "white";

    var Score = 1000 - Timer.toPrecision(2);
    ctx.fillText("Score: " + Score, 20, 40);
}

function ShowSpaceBarAction(){
    if(CanCollectPeople){
        //Draws base
        ctx.fillStyle = "red";
        ctx.fillRect(380, 520, 240, 30)

        ctx.lineWidth = "6";

        //draws outline
        ctx.fillStyle = "black";
        ctx.strokeRect(380, 520, 240, 30)

        //draws COLLECT
        ctx.font = "25px Trebuchet MS";
        ctx.fillStyle = "white";
        ctx.fillText('PICK UP', 453, 543)
    }
    else{
        //Draws base
        ctx.fillStyle = "white";
        ctx.fillRect(380, 520, 240, 30)
        //draws outline
        ctx.lineWidth = "6"
        ctx.fillStyle = "black";
        ctx.strokeRect(380, 520, 240, 30)
        
        //draws COLLECT
        ctx.font = "25px Trebuchet MS";
        ctx.fillStyle = "black";
        ctx.fillText('PICK UP', 453, 543)
    }
}

function CheckPlayerCollision(){
    //Ax is back left
    var Ax = char.Main.X + Math.cos((char.Angle+16.14)*Math.PI/180)*39;
    var Ay = char.Main.Y - Math.sin((char.Angle+16.14)*Math.PI/180)*39;
    var Bx = char.Main.X + Math.cos((char.Angle+163.86)*Math.PI/180)*46;
    var By = char.Main.Y - Math.sin((char.Angle+163.86)*Math.PI/180)*46;
    var Cx = char.Main.X + Math.cos((char.Angle-163.86)*Math.PI/180)*46;
    var Cy = char.Main.Y - Math.sin((char.Angle-163.86)*Math.PI/180)*46;
    var Dx = char.Main.X + Math.cos((char.Angle-16.14)*Math.PI/180)*39;
    var Dy = char.Main.Y - Math.sin((char.Angle-16.14)*Math.PI/180)*39;

    var Ex = char.Main.X + Math.cos((char.Angle)*Math.PI/180)*39;
    var Ey = char.Main.Y - Math.sin((char.Angle)*Math.PI/180)*39;
    var Fx = char.Main.X + Math.cos((char.Angle+180)*Math.PI/180)*46;
    var Fy = char.Main.Y - Math.sin((char.Angle+180)*Math.PI/180)*46;
    var Gx = char.Main.X + Math.cos((char.Angle+180)*Math.PI/180)*24;
    var Gy = char.Main.Y - Math.sin((char.Angle+180)*Math.PI/180)*24;
    var Hx = char.Main.X + Math.cos((char.Angle)*Math.PI/180)*20;
    var Hy = char.Main.Y - Math.sin((char.Angle)*Math.PI/180)*20;

    touchingOne = false;

    for(var j = 0; j < people.length; j++){
        people[j].CheckForCollisions(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, Ex, Ey, Fx, Fy, 0);
        people[j].DetectCirclePointCollisions(char.Main.X, char.Main.Y)
        people[j].DetectCirclePointCollisions(Gx, Gy);
        people[j].DetectCirclePointCollisions(Hx, Hy);
        
        CheckIfOutsideBoundaries(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy);
    }
    if(!touchingOne){
        CanCollectPeople = false;
    }
}



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function CheckIfOutsideBoundaries(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy){
    if(ScreenPos.X + Ax > 1000 || ScreenPos.X + Bx > 1000 || ScreenPos.X + Cx > 1000 || ScreenPos.X + Dx > 1000){
        GamePlaying = false;
        Timer = 1000;
        HitBorder.play();
    } 
    else if(ScreenPos.X + Ax < -1000 || ScreenPos.X + Bx < -1000 || ScreenPos.X + Cx < -1000 || ScreenPos.X + Dx < -1000){
        GamePlaying = false;
        Timer = 1000;
        HitBorder.play();
    }
    else if(ScreenPos.Y + Ay < 0 || ScreenPos.Y + By < 0 || ScreenPos.Y + Cy < 0 || ScreenPos.Y + Dy < 0){
        GamePlaying = false;
        Timer = 1000;
        HitBorder.play();
    }
    else if(ScreenPos.Y + Ay > 1200 || ScreenPos.Y + By > 1200 || ScreenPos.Y + Cy > 1200 || ScreenPos.Y + Dy > 1200){
        GamePlaying = false;
        Timer = 1000;
        HitBorder.play();
    }
}


function keyDownHandler(e){
    //Player keys
    if(e.key == "d" || e.key == "D"){
        char.KeysDown.D = true;
    }

    if(e.key == "a" || e.key == "A"){

        char.KeysDown.A = true;
    }

    if(e.key == "w" || e.key == "W"){

        char.KeysDown.W = true;
    }

    if(e.key == " " || e.key == ""){
        if(CanCollectPeople && GamePlaying) {
            CollectingFunction();
        }
        else if(!CanCollectPeople && GamePlaying){
            CantPickup.play();
        }
        else if(!GamePlaying){
            Reset();
            PlayAgain.play();
        }
        
    }

    if(e.keyCode == "16"){
        GoFaster = true;
    }
    if(e.keyCode == "27" && !GamePlaying){
        console.log("hit back")
        history.back();
    }   

}

//turns off all of the movement things when the key is let go
function keyUpHandler(e){
    //Player keys
    if(e.key == "d" || e.key == "D"){
        char.KeysDown.D = false;
    }
    if(e.key == "a" || e.key == "A"){
        char.KeysDown.A = false;
    }

    if(e.key == "w" || e.key == "W"){
        char.KeysDown.W = false;
    }

    if(e.keyCode == "16"){
        GoFaster = false;
    }

}
