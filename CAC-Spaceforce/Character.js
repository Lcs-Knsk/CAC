class Character{
    constructor(){
        this.Main = {
            X: 200,
            Y: 200,
            Height: 190.5,
            Width: 75.7
        }

        this.Angles = {
            Reg: 90,
            Up: 80,
            Down: 100,
        }
        this.Angle = 90;

        this.Speed = 1;

        this.Img = new Image();
        this.Img.src = "Art/SpaceShip.png";
    }

    Logic(){
        //draw 
        this.Rotate(this.Angle, this.Main.X, this.Main.Y, this.Img, this.Main.Width, this.Main.Height)
        //move up and down
        this.Move();

        //Check for meteor collisions

    }

    Move(){
        if(KeysDown.W || KeysDown.Up){
            if(this.Main.Y >= 95) this.Main.Y -= this.Speed;
            this.Angle = this.Angles.Up
        }
        if(KeysDown.S || KeysDown.Down){
            if(this.Main.Y <= 505) this.Main.Y += this.Speed;
            this.Angle = this.Angles.Down;
        }
        if(!KeysDown.S && !KeysDown.W && !KeysDown.Up && !KeysDown.Down) this.Angle = this.Angles.Reg;
    }

    Rotate(degrees, XOfImage, YOfImage, objectImg, WOfImage, HOfImage){
        // save the unrotated context of the canvas so we can restore it later
        // the alternative is to untranslate & unrotate after drawing
        ctx.save();

        // move to the center of the canvas
        ctx.translate(XOfImage, YOfImage);

        // rotate the canvas to the specified degrees
        ctx.rotate(degrees * Math.PI / 180);

        // draw the image
        ctx.drawImage(objectImg, -WOfImage/2, -HOfImage/2, WOfImage, HOfImage);


        // we’re done with the rotating so restore the unrotated context
        ctx.restore();

    }
}