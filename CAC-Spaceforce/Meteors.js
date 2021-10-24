class Meteors{
    constructor(PosY, Speed){
        this.Main = {
            X: 1000,
            Y: PosY,
            Width: 40,
            Height: 40,
        }

        this.WhichOne = Math.floor(Math.random()*12);
        this.WhichOne = this.WhichOne*32+this.WhichOne*16;

        this.Image = {
            X: 0,
            Y: this.WhichOne
        }

        this.Speed = Speed;

    }

    Logic(){
        //draw
        ctx.drawImage(MeteorImage, this.Image.X, this.Image.Y, 32, 32, this.Main.X, this.Main.Y, this.Main.Width, this.Main.Height)
        //move
        this.Move();

    }

    Move(){
        this.Main.X -= this.Speed;
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