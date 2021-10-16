class Bullet{
    constructor(directionStart, startX, startY){
        this.Main = {
            rotation: directionStart,
            x: startX,
            y: startY,

            globalSpeed: 0.010,
            speed: 10,

            height: 10,
            width: 10,
        }

        this.BulImage = new Image;
        this.BulImage.src = "art/bullet.png";
    }


    Logic(){
        //move
        this.Move()

        //draw
        Bluezy.rotateImage.Radian(this.Main.rotation, this.Main.x, this.Main.y, this.BulImage, this.Main.width, this.Main.height);


        //check for collision
    }


    Move(){
        this.Main.x = Bluezy.Geometry.findEdgeOfCircle.findX(this.Main.x, this.Main.speed, this.Main.rotation, 1);
        this.Main.y = Bluezy.Geometry.findEdgeOfCircle.findY(this.Main.y, this.Main.speed, this.Main.rotation, 1);
    }

}