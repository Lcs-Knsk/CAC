canvas = document.getElementById("gameScreen");
ctx = canvas.getContext("2d");

var char = [];
var people = [];

var AmountLeft = 25;

var ScreenPos = {
    X: 0,
    Y: 0,
}

var OutSideBorder = {
    X: -1000,
    Y: -600,
}


function GameLoop(){
    //reset screen
    ctx.fillStyle = "rgb(0, 119, 190)"
    ctx.fillRect(0, 0, 1000, 600);


    ctx.strokeRect(
        OutSideBorder.X - ScreenPos.X,
        OutSideBorder.Y + ScreenPos.Y, 2000, 1200);

    //Character Logic
    char.Logic();
    CheckPlayerCollision();

    //saving people and ships
    for(var i = 0; i < people.length; i++){
        people[i].Logic();
    }

    //UI
    ShowHowManyLeft();

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


function ShowHowManyLeft(){
    ctx.fillStyle = "white";
    ctx.font = "40px Trebuchet MS";
    ctx.fillText('Buoys Left: ' + AmountLeft + '/25', 650, 40);
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

    for(var j = 0; j < people.length; j++){
        people[j].CheckForCollisions(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, Ex, Ey, Fx, Fy, 0);
    }
}



document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


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


    }

}

//turns off all of the movement things when the key is let go
function keyUpHandler(e){
    //Player keys
    if(e.key == "d"){

        char.KeysDown.D = false;
    }
    if(e.key == "a"){

        char.KeysDown.A = false;
    }

    if(e.key == "w"){

        char.KeysDown.W = false;
    }

}
