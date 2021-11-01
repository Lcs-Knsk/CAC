// finds html canvas element and transfers to script
const canvas = document.getElementById('GameScreen');
const ctx = canvas.getContext('2d');

var PlaneTiltAngle = -5;

var PinImg = new Image();
PinImg.src = "AirForcePin.png";
var NotPinImg = new Image();
NotPinImg.src = "NotGottenPin.png";

var PlayOnTouch = false;

if(sessionStorage.getItem("AirforceSound") != "true"){
    sessionStorage.setItem("AirforceSound", true);
    PlayOnTouch = true;
}

var JustPlaneImg = new Image();
JustPlaneImg.src = "JustPlaneImg.png";


// USER VARIABLES \\
/* user state */
var alive = true;
var speed = 1;
var userY = 387;
/*user jumping*/
var worldGravity = 0.9;
var keySpace = false;
var playerSpeedY = 0;
var playerJumping = false;
var hit = false;
var goal = 40;

ctx.lineWidth = 11;



function Reset(){
    // USER VARIABLES \\
    /* user state */
    alive = true;
    speed = 1;
    userY = 387;
    /*user jumping*/
    worldGravity = 0.9;
    keySpace = false;
    playerSpeedY = 0;
    playerJumping = false;
    hit = false;
    goal = 40;

    numClouds = 5;
    cloudPosX = [];
    cloudPosY = [];
    for (i = 0; i < numClouds; i++){
        cloudPosX[i] = Math.round(200*i + (Math.random() * (1000*i - 200*i)));
        cloudPosY[i] = 70;
    }

    animFrame = 6;

    numObsticals = 5;
    obsticalPosX = [];
    obsticalPosY = [];
    obsticalPosY2 = [];

    obsticalPosX[0] = Math.round(900 + (Math.random() * (1000 - 900)));

    for(i = 0; i < numObsticals; i++){
    obsticalPosY[i] = Math.round(100 + (Math.random() * (300 - 100))); 
    obsticalPosY2[i] = obsticalPosY[i] + 130;
    }

    for (i = 1; i < numObsticals; i++){
        obsticalPosX[i] = obsticalPosX[i-1]+(200+(Math.round(100+(Math.random()*125-100))))
        
    }

    numHills = 7;
    hillPosX = [];
    hillPosY = [];
    hillRadii = [];
    for (i = 0; i < numHills; i++){
        hillPosX[i] = Math.round(20*i + (Math.random() * (2000 - 20)));
        hillRadii[i] = Math.round(80*i + (Math.random() * (200 - 80)));
    }

    //-----------PLAYER FUNCTIONS-------------\\
    time = 90;
    score = 0;


}

//GAMELOOP
function GameLoop(){
    if(hit == false){
        ctx.clearRect(0, 0, 500, 1200);
        drawScenery();
        drawChar();
        updatePlayer();
        obsticals();
        speedControl();
        keepScore();
    }
    else{
        drawEndUI();
    }
}

//---------------------DRAWING FUNCTIONS----------------------\\
// function to draw sky
function drawSky(){
    // makes the sky's gradiant
    var grd = ctx.createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "#9be2fe");
    grd.addColorStop(1, "#67d1fb");
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 1200, 500);
}

// draw ground
function drawGround(){
    ctx.fillStyle = "#3e802b";
    
    ctx.fillRect(0, 450, 1200,50);
    ctx.fillStyle = "#875514";
    ctx.fillRect(0, 460, 1200,50);
}

//cloud variables
var numClouds = 5;
var cloudPosX = [];
var cloudPosY = [];
for (i = 0; i < numClouds; i++){
    cloudPosX[i] = Math.round(200*i + (Math.random() * (1000*i - 200*i)));
    cloudPosY[i] = 70;
}
// draw clouds
function drawClouds(){
    // cloud color white
    ctx .fillStyle = "#FFFFFF";
    //loop that animates clouds
    for (i = 0; i < numClouds; i++){
        ctx.fillRect(cloudPosX[i], cloudPosY[i], 90, 30);
        if(cloudPosX[i] > -100){
            cloudPosX[i] = cloudPosX[i] - speed*0.24;  
        }
        else {
            cloudPosX[i] = Math.round(1250 + (Math.random() * (1800 - 1250)));;
            cloudPosY[i] = Math.round(50 + (Math.random() * (100 - 50)));
        }
        
    }
}

function drawEndUI(){
    //reset screen
    ctx.globalAlpha = 0.002;
    ctx.fillStyle = "gray";
    ctx.fillRect(0, 0, 1200, 500,);
    ctx.globalAlpha = 1;
    ctx.fillRect(311, 250-50, 533, 146);
    ctx.fillStyle = "black";
    //top line
    
    ctx.fillRect(300, 150-47.25-50, 11, 300);
    
    //right line
    ctx.fillRect(300, 150-47.25-50, 555, 11);
    //bottom line
    ctx.fillRect(300, 439-47.25-50, 555, 11);
    //right line
    ctx.fillRect(844, 150-47.25-50, 11, 300);
    //middle line
    ctx.fillRect(300, 297-47.25-50, 555, 6);
    //Bottom middle line
    ctx.fillRect(573, 303-47.25-50, 6, 147);

    //Draw the "Hit space to play button"
    ctx.fillStyle = "red";
    ctx.fillRect(311, 161-47.25-50, 533, 136);

    //Show "esc to map"
    ctx.fillStyle = "black";
    ctx.lineWidth = 11;
    ctx.strokeRect(227.5+78, 444.5-47.25-50, 544, 94.5);
    
    ctx.fillText("Esc to go back to map", 310+78, 506-47.25-50)
    
    ////////////////////////

    //Draw Plat Button
    ctx.fillStyle = "black"
    ctx.font = "40px Trebuchet MS";
    ctx.fillText("Press space to play again", 350, 240-47.25-50);

    ctx.font = "40px Trebuchet MS";
    ctx.fillStyle = "black"
    ctx.fillText("Score: " + score, 370, 360-47.25-50);
    if(score >= goal){
        sessionStorage.setItem("Airforce", true);
        ctx.fillStyle = "lightgreen";
    }
    else{
        ctx.fillStyle = "red";
    }
    if(sessionStorage.getItem("Airforce") == "true"){
        ctx.drawImage(PinImg, 620, 265-50, 180, 120);
    }
    else{
        ctx.drawImage(NotPinImg, 620, 265-50, 180, 120);
    }
    ctx.fillText("Goal: " + goal, 370, 360-50);

    if(keySpace){
        Reset();
    }
}

//background basic shapes
function drawBackground(){
    // uses arc to draw hills
    ctx.fillStyle = "#359c13";

    for (i = 0; i < numHills; i++){
        ctx.save();
        ctx.fillStyle = "#3cab00";
        ctx.scale(1, 0.75);
        ctx.beginPath();
        ctx.arc(hillPosX[i], 650, hillRadii[i], 0, 2 * Math.PI);
        ctx.strokeStyle = "#91ff80";
        ctx.stroke();
        ctx.fill();
        ctx.restore();
        // hill movement
        if(hillPosX[i] > -600){
            hillPosX[i] = hillPosX[i] - speed*0.2;  
        }
        else {
            hillPosX[i] = Math.round(1650 + (Math.random() * (1900 - 1650)));;
            hillRadii[i] = Math.round(80*i + (Math.random() * (200 - 80)));
        }
    }
    
}

//function that calls all other individual graphic realted functions
function drawScenery(){
    drawSky();
    drawClouds();
    drawBackground();
    drawGround();
    
}
// player animation
this.Anim = {
    FrameRow: 1,
    PlayerImage: new Image,

    FrameWidth: 64,
    FrameHeight: 60,

    FrameNumber: 2,
    HighFrameNumber: 3,
    Animate: false
}
var animFrame = 6;

this.Anim.PlayerImage.src = "airplaneSprite.png";

//draws character in right frame
function drawChar(){

    if(keySpace){
        Draw()
    }
    else{   
        ctx.drawImage(this.Anim.PlayerImage, (this.Anim.FrameWidth)*animFrame, this.Anim.FrameHeight*2,
        this.Anim.FrameWidth, this.Anim.FrameHeight, 180, userY, 80, 80);
    }
    if(userY >= 380){
        animFrame = 6;
    }
    else{
        animFrame = 0;
    }
    if(userY <= 380 && userY >= 340){
        animFrame = 5;
    }




}

function Draw(){
    ctx.translate(220, userY+40);
    ctx.rotate(PlaneTiltAngle*Math.PI/180);
    ctx.drawImage(JustPlaneImg, -40, -40, 80, 80);
    
    ctx.rotate(-PlaneTiltAngle*Math.PI/180);
    ctx.translate(-220, -userY-40);

}

// creates obsticals
var numObsticals = 5;
var obsticalPosX = [];
var obsticalPosY = [];
var obsticalPosY2 = [];

obsticalPosX[0] = Math.round(900 + (Math.random() * (1000 - 900)));

for(i = 0; i < numObsticals; i++){
   obsticalPosY[i] = Math.round(100 + (Math.random() * (300 - 100))); 
   obsticalPosY2[i] = obsticalPosY[i] + 130;
}

for (i = 1; i < numObsticals; i++){
    obsticalPosX[i] = obsticalPosX[i-1]+(200+(Math.round(100+(Math.random()*125-100))))
    
}


function obsticals(){
    for(i = 0; i < numObsticals; i++){
        ctx.fillStyle = "#fcba03";
        ctx.beginPath();
        ctx.rect(obsticalPosX[i], 0, 30, obsticalPosY[i]);
        ctx.stroke();
        ctx.fill();
        obsticalPosX[i] = obsticalPosX[i] - speed*0.2;
        ctx.beginPath();
        ctx.rect(obsticalPosX[i], obsticalPosY2[i], 30, 600);
        ctx.stroke();
        ctx.fill();
        if(obsticalPosX[i] < -100){
            obsticalPosX[i] = Math.round((1900 + i*200) + (Math.random() * (2000 - 1900)));
            obsticalPosY[i] = Math.round(100 + (Math.random() * (300 - 100)));
            obsticalPosY2[i] = obsticalPosY[i] + 130;
        }
    }
    
    for(i = 0; i < numObsticals; i++){
        
        if(obsticalPosX[i]-80 < 180 && 180 < obsticalPosX[i] + 60){
            if(userY < obsticalPosY[i] - 60 || userY + 60 > obsticalPosY2[i]){
                console.log("hit");
                hit = true;
                keySpace = false;
            }
        }
    }
}
// HILL VARIABLES
var numHills = 7;
var hillPosX = [];
var hillPosY = [];
var hillRadii = [];
for (i = 0; i < numHills; i++){
    hillPosX[i] = Math.round(20*i + (Math.random() * (2000 - 20)));
    hillRadii[i] = Math.round(80*i + (Math.random() * (200 - 80)));
}

//-----------PLAYER FUNCTIONS-------------\\
var time = 90;

function speedControl(){
    time = time + 0.01;   
    
    if(time >= 10 && time <= 25){
        speed = 3;
    }
    else if(time > 25 && time <= 50){
        speed = 4;
    }
    else if(time > 50 && time <= 100){
        speed = 5;
    }
    else if(time > 100){
        speed = 7;
    }
}

var score = 0;
function keepScore(){
    score = Math.round((time-90));
    console.log(score);
    ctx.fillStyle = "white"
    ctx.font = "40px Trebuchet MS";
    ctx.fillText("Score: "+ score, 1000, 50);
}



function updatePlayer(){
    if(keySpace == true && userY > -10){
        this.Anim.FrameNumber = 2;
        userY = userY - 1;
    }  
    if(keySpace == false && userY < 387){
        playerJumping = true;
        userY = userY + 0.7;
    }
    if(userY == 387){
        playerJumping = false;
    }
}
    



function keyDownHandler(e){
    if (e.key === ' ' || e.key === 'Spacebar'){
        keySpace = true;
        if(PlayOnTouch){
            PlayOnTouch = false;
            var NewAud = new Audio("Air Force.wav");
            NewAud.play();
        }
    }
    if(e.key == "Escape" && hit){
        console.log("hit")
        history.go(-1);
    }
}
function keyUpHandler(e){
    if (e.key === ' ' || e.key === 'Spacebar'){
        keySpace = false;
    }
}

function resetGlobalVariables(){
    alive = true;
    speed = 1;
    userY = 387;
    /*user jumping*/
    worldGravity = 0.9;
    keySpace = false;
    playerSpeedY = 0;
    playerJumping = false;
    hit = false;
    


    cloudPosX = [];
    cloudPosY = [];
    for (i = 0; i < numClouds; i++){
        cloudPosX[i] = Math.round(200*i + (Math.random() * (1000*i - 200*i)));
        cloudPosY[i] = 70;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// sets game intervals
setInterval(GameLoop, 10);



