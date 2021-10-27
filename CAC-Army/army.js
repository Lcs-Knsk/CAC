const canvas = document.getElementById('GameScreen');
const ctx = canvas.getContext('2d');

var userY = 100;
var userX = 200;
var userWidth = 69;
var userHeight = 164;
var keyLeft = false;
var keyRight = false;
var speedMax = 3;
var speed = 0.2;
var rightMomentum = 0.5;
var leftMomentum = 0.5;
var isAlive = true;
var goal = 25;
var score = 0;

initThings();

function GameLoop(){
	ctx.clearRect(0, 0, 800, 600);
	collisionDetection();
	drawSky();
	drawClouds();
	drawBirds();
	updatePlayer();
	drawChar();
	//drawUser();
	speedController();
	if(isAlive == false){
		drawEndUI();
	}
	ctx.fillStyle = "white"
    ctx.font = "40px Trebuchet MS";
    ctx.fillText("Score: "+ score, 610, 50);
}

function drawSky(){
    // makes the sky's gradiant
    var grd = ctx.createLinearGradient(0, 0, 0, 200);
    grd.addColorStop(0, "#3291a8");
    grd.addColorStop(1, "#328cfa");
    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, 800, 600);
}

function drawUser(){
	ctx.fillStyle = "red";
	ctx.fillRect(userX, userY, userWidth, userHeight);
}

function updatePlayer(){
	if(isAlive){
		userX = userX - leftMomentum + rightMomentum;	
	}
	
}

function keyDownHandler(e){
    if (e.keyCode == '37'){
        keyLeft = true;
        
    }
    if (e.keyCode == '39'){
    	keyRight = true;
    	
    }
}
function keyUpHandler(e){
	if (e.keyCode == '37'){
        keyLeft = false;
        
    }
    if (e.keyCode == '39'){
    	keyRight = false;
    	
    }
}

function speedController(){
	if(keyRight && keyLeft == false){
		if(rightMomentum <= speedMax){
			rightMomentum = rightMomentum*1.02;
		}
		leftMomentum = leftMomentum*0.98;
		
	}
	if(keyLeft && keyRight == false){
		if(leftMomentum <= speedMax){
			leftMomentum = leftMomentum*1.02;
		}
		rightMomentum = rightMomentum*0.98;
		
	}

	if(keyRight == false && keyLeft == false && (rightMomentum >= 0.5 || leftMomentum >= 0.5)){
		if(rightMomentum > 0.55){
			rightMomentum = rightMomentum*0.98;
		}
		else{
			rightMomentum = 0.5;
		}
		if(leftMomentum > 0.55){
			leftMomentum = leftMomentum*0.98;
		}
		else{
			leftMomentum = 0.5;
		}
		
	}	
}

this.Anim = {
    FrameRow: 0,
    PlayerImage: new Image,

    FrameWidth: 64,
    FrameHeight: 64,

    FrameNumber: 1,
    Animate: false,

    Angle: 90
}
var animFrame = 1;


//draws character in right frame
function drawChar(){
	if(isAlive){
		if(Math.abs(leftMomentum - rightMomentum)<=0.5){
			this.Anim.PlayerImage.src = "Graphics/paraSprite3.png";
			ctx.drawImage(this.Anim.PlayerImage, userX, userY);
		}
		
	   	else if((leftMomentum - rightMomentum) > 0.5){
	   		this.Anim.PlayerImage.src = "Graphics/paraSprite2.png";
	   		ctx.drawImage(this.Anim.PlayerImage, userX, userY);
	   	}
	   	else if((rightMomentum - leftMomentum) > 0.5){
	   		this.Anim.PlayerImage.src = "Graphics/paraSprite1.png";
	   		ctx.drawImage(this.Anim.PlayerImage, userX, userY);
	   	}	
	}
	
    
}

//cloud variables
var numClouds = 10;
var cloudPosX = [];
var cloudPosY = [];
var numBirds = 15;
var birdPosX = [];
var birdPosY = [];
var birdDirection = [];
var birdColor = [];
var birdAnimFrame = [];
function initThings(){
	for (i = 0; i < numClouds; i++){
	    cloudPosX[i] = Math.round((Math.random() * (800)));
	    cloudPosY[i] = Math.round(800 + (Math.random() * (20000*i - 800*i)));
	}/*
	for (i = 0; i < numBirds; i++){
		birdPosX[i] = 200;
	    birdPosY[i] = Math.round(200 + (Math.random() * (800*i - 200*i)));
	}*/

}

for (i = 0; i < numBirds; i++){
	birdPosX[i] = Math.round((Math.random() * (800)));
    birdPosY[i] = Math.round(400 + (Math.random() * (800*i - 400*i)));
    birdDirection[i] = Math.round(1 + Math.random() * 2 - 1);
    birdColor[i] = Math.round(Math.random() * 3);
    birdAnimFrame[i] = Math.round(Math.random() * 3);
}

// draw clouds
function drawClouds(){
    // cloud color white
    ctx .fillStyle = "#FFFFFF";
    //loop that animates clouds
    for (i = 0; i < numClouds; i++){
        ctx.fillRect(cloudPosX[i], cloudPosY[i], 90, 30);
        if(cloudPosY[i] > -100){
            cloudPosY[i] = cloudPosY[i] - 1;  
        }
        else {
            cloudPosX[i] = Math.round((Math.random() * (800)));
    		cloudPosY[i] = Math.round(800 + (Math.random() * (20000*i - 800*i)));
        }
    }
}

this.Bird = {
    FrameRow: 0,
    BirdImage: new Image,

    FrameWidth: 202,
    FrameHeight: 178,

    FrameNumber: 3,
    Animate: false
}
this.Bird.BirdImage.src = "Graphics/birdSprite2.png";

function drawBirds(){
	// cloud color white
    ctx .fillStyle = "red";
    //loop that animates clouds
    for (i = 0; i < numBirds; i++){
        //ctx.fillRect(birdPosX[i], birdPosY[i], 30, 30);
        ctx.drawImage(this.Bird.BirdImage, this.Bird.FrameWidth*birdAnimFrame[i], this.Bird.FrameHeight*birdColor[i]+(birdDirection[i] * 698.5), 
        	200, 200, birdPosX[i], birdPosY[i], 60, 60);
        if(birdPosY[i] > -100){
            birdPosY[i] = birdPosY[i] - 1;  
        }
        else {
            birdPosX[i] = Math.round((Math.random() * (800)));
    		birdPosY[i] = Math.round(900 + (Math.random() * (1200*i - 900*i)));
    		birdDirection[i] = Math.round(Math.random());
        }

        if(birdDirection[i] == 1){
        	birdPosX[i] = birdPosX[i] - 0.5;
        } 
        else if(birdDirection[i] == 0){
        	birdPosX[i] = birdPosX[i] + 0.5;
        } 
    }
    
}

function updateBird(){
	for(i = 0; i < numBirds; i++){
		if(birdAnimFrame[i] < 3){
			birdAnimFrame[i]++;
		}
		else{
			birdAnimFrame[i] = 0;
		}
	}
}

function collisionDetection(){
	for(i = 0; i < numBirds; i++){
		if((userX >= birdPosX[i] && userX <= birdPosX[i]  + this.Bird.FrameWidth) || 
			(userX + userWidth >= birdPosX[i] && userX + userWidth <= birdPosX[i]  + this.Bird.FrameWidth)){
			if(birdPosY[i] <= userY + 130 && birdPosY[i] >= userY - 30){
				console.log("you died");
				isAlive = false;
			}		
		}
	}
}

function drawEndUI(){
    //reset screen

   	let img = document.createElement("crash");
   	let crash = new Image();
   	crash.src = "Graphics/paraCrash.png";

   	ctx.drawImage(crash, 267, 0, 40, 100, userX, userY, 60, 160);
   	userY += speed * 10;
    if(userY >= 800){
	    ctx.globalAlpha = 0.002;
	    ctx.fillStyle = "gray";
	    ctx.fillRect(0, 0, 1200, 500,);
	    ctx.globalAlpha = 1;
	    ctx.fillRect(131, 250, 533, 146);
	    ctx.fillStyle = "black";
	    //top line
	    
	    ctx.fillRect(120, 150-47.25, 11, 300);
	    
	    //right line
	    ctx.fillRect(120, 150-47.25, 555, 11);
	    //bottom line
	    ctx.fillRect(120, 439-47.25, 555, 11);
	    //right line
	    ctx.fillRect(664, 150-47.25, 11, 300);
	    //middle line
	    ctx.fillRect(120, 297-47.25, 555, 6);
	    //Bottom middle line
	    ctx.fillRect(393, 303-47.25, 6, 147);

	    //Draw the "Hit space to play button"
	    ctx.fillStyle = "red";
	    ctx.fillRect(131, 161-47.25, 533, 136);
	    
	    //Draw Plat Button
	    ctx.fillStyle = "black"
	    ctx.font = "40px Trebuchet MS";
	    ctx.fillText("Press space to play again", 170, 240-47.25);

	    ctx.font = "40px Trebuchet MS";
	    ctx.fillStyle = "black"
	    ctx.fillText("Score: " + score, 160, 360-47.25);
	    
	    ctx.fillText("Goal: " + goal, 160, 360);
    }
}

function scoreStuff(){
	score++;
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// sets game intervals
setInterval(GameLoop, 10);
setInterval(updateBird, 100); 
setInterval(scoreStuff, 1000);
