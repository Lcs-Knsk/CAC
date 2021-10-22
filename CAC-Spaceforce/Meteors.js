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
        ctx.drawImage(MeteorImage, this.Main.X, this.Main.Y, this.Image.X, this.Image.Y);
        ctx.drawImage(MeteorImage, this.Image.X, this.Image.Y, 32, 32, this.Main.X, this.Main.Y, this.Main.Width, this.Main.Height)
        //move
        this.Move();

    }

    Move(){
        this.Main.X -= this.Speed;
    }
}