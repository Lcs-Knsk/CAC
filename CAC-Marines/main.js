const canvas = document.getElementById('gameScreen');
const ctx = canvas.getContext('2d');

const Bluezy = new helpfulFunction();

var Targets = [];


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

    //background/whiteout
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "rgb(222, 184, 135)"
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    //target movement + slider
    for(var i = 0; i < Targets.length; i++){
        Targets[i].Logic();
    }


    //char movement
    Char.Logic();




    //show score



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

//#region key down and up handlers
function mouseDownHandler(){
    var BulletThing = new Bullet(Char.topGun.rotation, Char.topGun.Gun.Mainx, Char.topGun.Gun.Mainy);
    Char.topGun.Gun.Bullets.push(BulletThing);

}



//#endregion




