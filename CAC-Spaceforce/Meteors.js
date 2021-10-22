class Meteors{
    constructor(PosY){
        this.Main = {
            X: 700,
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

    }

    Logic(){
        //draw
        ctx.drawImage(MeteorImage, this.Main.X, this.Main.Y, this.Image.X, this.Image.Y);
        ctx.drawImage(MeteorImage, this.Image.X, this.Image.Y, 32, 32, this.Main.X, this.Main.Y, this.Main.Width, this.Main.Height)
        //move

    }
}