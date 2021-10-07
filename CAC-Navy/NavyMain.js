const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');

var char = [];
var enem = [];

var Timer = 0;

var mines = [];

var WhichBoat = 0;

var GamePlaying = true;

var AllDead = true;

var ConsoleLog = false;

var PlaySet = true;

var NavyPin = new Image;
NavyPin.src = "Art/NavyPin.png";
var NotYetNavyPin = new Image;
NotYetNavyPin.src = "Art/UnGotNavyPin.png";
AchievedNavyPin = false;



function Reset(){
    char = [];
    enem = [];

    Timer = 0;

    mines = [];

    WhichBoat = 0;

    GamePlaying = true;

    
    char.push(new NavyCharacter(111, 500, true, 270));
    char.push(new NavyCharacter(630, 480, false, 180));
    char.push(new NavyCharacter(700, 50, false, 180));


    enem.push(new EnemyBoat(333, 255, 270));
    enem.push(new EnemyBoat(400, 560, 0));
    enem.push(new EnemyBoat(540, 70, 0));
    enem.push(new EnemyBoat(90, 50, 0));
    enem.push(new EnemyBoat(800, 280, 90));
    enem.push(new EnemyBoat(850, 500, 90))
    enem.push(new EnemyBoat(605, 340, 270))


    for(var i = 150; i < 401; i += 30){
        mines.push(new MineField(215, i));
    }
    for(var i = 215; i < 600; i += 30 ){
        mines.push(new MineField(i, 150))
    }
    for(var i = 400; i < 800; i += 30){
        mines.push(new MineField(i, 420))
    }
    for(var i = 5; i < 215; i += 30){
        mines.push(new MineField(i, 270))
    }
    for(var i = 800; i < 1000; i += 30){
        mines.push(new MineField(i, 150))
    }
    for(var i = 150; i < 300; i += 30){
        mines.push(new MineField(605, i))
    }

}

function GameLoop(){

    if(GamePlaying){
        
        //reset screen
        ctx.fillStyle = "rgb(0, 119, 190)"
        ctx.fillRect(0, 0, 1000, 600);


        //run enemy things
        for(var i = 0; i < enem.length; i++){
            enem[i].Logic();
        }
        //run mine things
        CheckMineCollision();
        for(var i = 0; i < mines.length; i++){
            mines[i].Logic();
        }    
        //run character things
        for(var i = 0; i < 3; i++){
            char[i].Logic();

        }


    }

    //Reset

    AllDead = true;
    for(var i = 0; i < enem.length; i++){
        if(enem[i].Alive){
            AllDead = false;
        }
    }

    //Draw timer
    if(!AllDead){
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(Timer.toPrecision(4), 925, 40);
    }


    //write press space to restart
    //true = AllDead usually
    if(AllDead){
        DrawEndScreen();
        GamePlaying = false;

    }

    if(!AllDead){
        Timer += .01;
    }

}

function CheckMineCollision(){
    //Ax is back left
    for(var i = 0; i < char.length; i++){
        if(char[i].Alive){
            var Ax = char[i].Main.X + Math.cos((char[0].Angle+16.14)*Math.PI/180)*46.84;
            var Ay = char[i].Main.Y - Math.sin((char[0].Angle+16.14)*Math.PI/180)*46.84;
            var Bx = char[i].Main.X + Math.cos((char[0].Angle+163.86)*Math.PI/180)*46.84;
            var By = char[i].Main.Y - Math.sin((char[0].Angle+163.86)*Math.PI/180)*46.84;
            var Cx = char[i].Main.X + Math.cos((char[0].Angle-163.86)*Math.PI/180)*46.84;
            var Cy = char[i].Main.Y - Math.sin((char[0].Angle-163.86)*Math.PI/180)*46.84;
            var Dx = char[i].Main.X + Math.cos((char[0].Angle-16.14)*Math.PI/180)*46.84;
            var Dy = char[i].Main.Y - Math.sin((char[0].Angle-16.14)*Math.PI/180)*46.84;

            for(var j = 0; j < mines.length; j++){
                mines[j].CheckForCollisions(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, i);
            }
        }
    }
}


function DrawEndScreen(){
    //Draw End screen

    //reset screen
    ctx.fillStyle = "rgb(0, 119, 190)"
    ctx.fillRect(0, 0, 1000, 600);

    //Blue Back Ground with black outsides
    ctx.fillStyle = "rgb(51, 87, 255)";
    ctx.fillRect(222, 150, 555, 300)
    ctx.fillStyle = "black";
    //top line
    ctx.fillRect(222, 150, 11, 300);
    //right line
    ctx.fillRect(222, 150, 555, 11);
    //bottom line
    ctx.fillRect(222, 439, 555, 11);
    //right line
    ctx.fillRect(766, 150, 11, 300);
    //middle line
    ctx.fillRect(222, 297, 555, 6);
    //Bottom middle line
    ctx.fillRect(495, 303, 6, 147);

    //Draw the "Hit space to play button"
    if(PlaySet){
        ctx.fillStyle = "rgb(100, 100, 100)";
    }
    else{
        ctx.fillStyle = "rgb(113, 121, 126)"
    }

    ctx.fillRect(233, 161, 533, 136);

    //Draw Plat Button
    ctx.fillStyle = "black"
    ctx.font = "40px Trebuchet MS";
    ctx.fillText("Press space to play again", 270, 240);

    //Show score
    ctx.font = "40px Trebuchet MS";
    ctx.fillStyle = "black"
    var ScoreAmount = 100-Timer.toPrecision(2);
    ctx.fillText("Score: " + ScoreAmount, 275, 360);

    if(ScoreAmount >= 72){
        AchievedNavyPin = true;
    }

    //Show score goal
    ctx.fillText("Goal: 72", 275, 410);

    //Draw badge
    if(AchievedNavyPin) ctx.drawImage(NavyPin, 540, 310, 180, 120);
    else ctx.drawImage(NotYetNavyPin, 540, 310, 180, 120);
}

//first thing to run after the window loads, also starts the game loop
window.onload = new function(){

    char.push(new NavyCharacter(111, 500, true, 270));
    char.push(new NavyCharacter(630, 480, false, 180));
    char.push(new NavyCharacter(700, 50, false, 180));


    enem.push(new EnemyBoat(333, 255, 270));
    enem.push(new EnemyBoat(400, 560, 0));
    enem.push(new EnemyBoat(540, 70, 0));
    enem.push(new EnemyBoat(90, 50, 0));
    enem.push(new EnemyBoat(800, 280, 90));
    enem.push(new EnemyBoat(850, 500, 90))
    enem.push(new EnemyBoat(605, 340, 270))


    for(var i = 150; i < 401; i += 30){
        mines.push(new MineField(215, i));
    }
    for(var i = 215; i < 600; i += 30 ){
        mines.push(new MineField(i, 150))
    }
    for(var i = 400; i < 800; i += 30){
        mines.push(new MineField(i, 420))
    }
    for(var i = 5; i < 215; i += 30){
        mines.push(new MineField(i, 270))
    }
    for(var i = 800; i < 1000; i += 30){
        mines.push(new MineField(i, 150))
    }
    for(var i = 150; i < 300; i += 30){
        mines.push(new MineField(605, i))
    }


    /*
    for(var i = 0; i < 5; i++){
        var newItem = new Mines();
        mineObjects.push(newItem)
    }
    */


    //starts the gameloop
    setInterval(GameLoop, 10);
    setInterval(SwitchPlaySet, 1000);
}

function SwitchPlaySet(){
    if(PlaySet){
        PlaySet = false;
    }
    else{
        PlaySet = true;
    }
}

GameLoop();


function switchBoats(){
    if(char[0].TabbedIn){
        char[0].TabbedIn = false;
        char[1].TabbedIn = true;

        WhichBoat = 1;
    }
    else if(char[1].TabbedIn){
        char[1].TabbedIn = false;
        char[2].TabbedIn = true;

        WhichBoat = 2;
    }
    else{
        char[2].TabbedIn = false;
        char[0].TabbedIn = true;

        WhichBoat = 0;
    }
}




//#region Key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);




//turns on all of the movement for the player
function keyDownHandler(e){
    //Player keys
    if(e.key == "d" || e.key == "D"){

        char[WhichBoat].KeysDown.D = true;

    }

    if(e.key == "a" || e.key == "A"){

        char[WhichBoat].KeysDown.A = true;
    }

    if(e.key == "w" || e.key == "W"){

        char[WhichBoat].KeysDown.W = true;
    }

    if(e.key == " " || e.key == ""){
        if(AllDead){
            Reset();
        }
        else{
            char[WhichBoat].ShootTheGun();
        }

    }

    if(e.keyCode == 16){
        switchBoats();
    }
}

//turns off all of the movement things when the key is let go
function keyUpHandler(e){
    //Player keys
    if(e.key == "d"){

        char[WhichBoat].KeysDown.D = false;
    }
    if(e.key == "a"){

        char[WhichBoat].KeysDown.A = false;
    }

    if(e.key == "w"){

        char[WhichBoat].KeysDown.W = false;
    }

}
