class Character{
    constructor(){
        this.globalMoveSpeed = 1;

        this.Main = {
            width: 100,
            height: 68,
            X: ctx.canvas.width/2,
            Y: ctx.canvas.height/2
        }
        this.Movement = {
            goLeft: false,
            goRight: false,
            goUp: false,
            goDown: false,

            //0.006 is the base movement speed
            //this keeps it inline with the size of the screen
            moveSpeed: this.globalMoveSpeed,

            //keeps what rotation the tank should be in
            rotation: 0,
            lastRotation: 0,
            rotationSpeed: 5,

        }
        this.topGun = {
            //keeps mouse positions
            mouse: {
                x: 0,
                y: 0
            },

            rotation: 0,
            width: 40,
            height: 160,


            Gun: {
                Mainx:0.00,
                Mainy:0.00,

                Bullets: [],
            }
        }

        //sets the tank image vars and gives them the source image
        this.tankTop = new Image();
        this.tankTop.src = "art/topOfTank.png";

    }

    Logic(){
        //move || MAKE THIS AUTO 
        this.MoveTank();

        //control bullets
        this.ControlBullets();

        this.UpdateTop();
    }
    
    ControlBullets(){
        for(var i = 0; i < this.topGun.Gun.Bullets.length; i++){
            if(this.topGun.Gun.Bullets[i].Main.x > 4000 || this.topGun.Gun.Bullets[i].Main.x < 0){
                //remove the bullet from the array
                this.topGun.Gun.Bullets.splice(i, 1);
            }
            else if(this.topGun.Gun.Bullets[i].Main.y > 1000 || this.topGun.Gun.Bullets[i].Main.y < 0){
                this.topGun.Gun.Bullets.splice(i, 1);
            }
            else{
                this.topGun.Gun.Bullets[i].Logic();
            }
        }
    }
    
    UpdateTop(){
        //finds rotation of top gun
        this.topGun.rotation = Math.atan2(
            this.topGun.mouse.x - this.Main.X,
            -(this.topGun.mouse.y - this.Main.Y),
        );

        //sets the image of the top gun in right rotation
        Bluezy.rotateImage.Radian(this.topGun.rotation, this.Main.X, this.Main.Y, this.tankTop, this.topGun.width, this.topGun.height);

        //finds the x coord of where the bullet is coming out of
        this.topGun.Gun.Mainx = Bluezy.Geometry.findEdgeOfCircle.findX(this.Main.X, this.topGun.height, this.topGun.rotation, 2);
        //finds the y coord of where the bullet is coming out of
        this.topGun.Gun.Mainy = Bluezy.Geometry.findEdgeOfCircle.findY(this.Main.Y, this.topGun.height, this.topGun.rotation, 2);

    }

    MoveTank(){

        if(this.Movement.goUp && this.Movement.goRight){
            this.Main.Y -= this.Movement.moveSpeed/1.5;
            this.Main.X += this.Movement.moveSpeed/1.5;
            this.Movement.rotation = 315;
        }
        else if(this.Movement.goRight && this.Movement.goDown){
            this.Main.Y += this.Movement.moveSpeed/1.5;
            this.Main.X += this.Movement.moveSpeed/1.5;
            this.Movement.rotation = 45;
        }
        else if(this.Movement.goDown && this.Movement.goLeft){
            this.Main.Y += this.Movement.moveSpeed/1.5;
            this.Main.X -= this.Movement.moveSpeed/1.5;
            this.Movement.rotation = 135;
        }
        else if(this.Movement.goLeft && this.Movement.goUp){
            this.Main.Y -= this.Movement.moveSpeed/1.5;
            this.Main.X -= this.Movement.moveSpeed/1.5;
            this.Movement.rotation = 225;
        }
        else{
            if(this.Movement.goUp){
                this.Main.Y -= this.Movement.moveSpeed;
                this.Movement.rotation = 270;
                
            }
            if(this.Movement.goDown){
                this.Main.Y += this.Movement.moveSpeed;
                this.Movement.rotation = 90;
            }
            if(this.Movement.goRight){
                this.Main.X += this.Movement.moveSpeed;
                this.Movement.rotation = 0;
            }
            if(this.Movement.goLeft){
                this.Main.X -= this.Movement.moveSpeed;
                this.Movement.rotation = 180;
            }
        }

    }



}