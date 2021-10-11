// finds html canvas element and transfers to script
const canvas = document.getElementById('GameScreen');
const ctx = canvas.getContext('2d');

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



// FUNCTIONS \\
function GameLoop(){
    if(hit == false){
        ctx.clearRect(0, 0, 500, 1200);
        drawScenery();
        drawChar();
        updatePlayer();
        obsticals();
        speedControl();
    }
    else{
        ctx.fillStyle = "#fc0303"
        ctx.font = "80px Arial";
        ctx.fillText("YOU SUCK", 300, userY+30);
    }
}
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
            cloudPosX[i] = cloudPosX[i] - speed*0.5;  
        }
        else {
            cloudPosX[i] = Math.round(1250 + (Math.random() * (1800 - 1250)));;
            cloudPosY[i] = Math.round(50 + (Math.random() * (100 - 50)));
        }
        
    }
}

var numHills = 7;
var hillPosX = [];
var hillPosY = [];
var hillRadii = [];
for (i = 0; i < numHills; i++){
    hillPosX[i] = Math.round(20*i + (Math.random() * (2000 - 20)));
    hillRadii[i] = Math.round(80*i + (Math.random() * (200 - 80)));
}
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

    FrameNumber: 0,
    HighFrameNumber: 3,
    Animate: false
}
var animFrame = 1;

this.Anim.PlayerImage.src = "SpritesAndStuff/airplaneSprite.png";

//draws character in right frame
function drawChar(){
    ctx.drawImage(this.Anim.PlayerImage, (this.Anim.FrameWidth)*animFrame, this.Anim.FrameHeight*2,
                this.Anim.FrameWidth, this.Anim.FrameHeight, 180, userY, 80, 80);
}
// creates obsticals
var numObsticals = 5;
var obsticalPosX = [];
var obsticalPosY = [];
var obsticalPosY2 = [];
for (i = 0; i < numObsticals; i++){
    obsticalPosX[i] = Math.round((900+ i*200) + (Math.random() * (1000 - 900)));
    obsticalPosY[i] = Math.round(100 + (Math.random() * (300 - 100)));
    obsticalPosY2[i] = obsticalPosY[i] + 130;
    console.log(obsticalPosY2[i]);
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
        
        if(obsticalPosX[i]-80 < 180 && 180 < obsticalPosX[i] + 30){
            if(userY < obsticalPosY[i] - 30 || userY + 30 > obsticalPosY2[i]){
                console.log("hit");
                hit = true;
            }
        }
            
            
            
    }
    
    
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
    if (e.key = " "){
        keySpace = true;
        
    }
}
function keyUpHandler(e){
    if (e.key = " "){
        keySpace = false;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// sets game intervals
setInterval(GameLoop, 10);


