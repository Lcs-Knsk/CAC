class TargetThings{
    constructor(XPos, YPos){
        this.Main = {
            X: XPos,
            Y: YPos,
            Height: 40,
            Width: 40,
        }

        this.health = 3;

        this.Direction = "up";


        this.Img = new Image;
        this.Img.src = "art/target.png";
        this.Img2 = new Image;
        this.Img2.src = "art/target2.png";
        this.Img3 = new Image;
        this.Img3.src = "art/target3.png"

        this.Speed = 2;
    }

    Logic(){
        if(this.health > 0){
            //Update position
            this.UpdatePosition();

            //draw
            this.Draw();

            this.CheckForCollisions();

        }
    }

    Draw(){
        if(this.health == 3){
            ctx.drawImage(this.Img, this.Main.X, this.Main.Y, this.Main.Width, this.Main.Height);
        }
        else if(this.health == 2){
            ctx.drawImage(this.Img2, this.Main.X, this.Main.Y, this.Main.Width, this.Main.Height);
        }
        else if(this.health == 1){
            ctx.drawImage(this.Img3, this.Main.X, this.Main.Y, this.Main.Width, this.Main.Height)
        }
    }

    UpdatePosition(){
        var testNumber = Math.floor(Math.random() * 60);

        if(testNumber == 1){
            if(this.Direction == "up"){
                this.Direction = "down";
            }
            else{
                this.Direction = "up";
            }
        }

        if(this.Main.Y <= 0){
            this.Direction = "down";
        }
        else if(this.Main.Y >= 560){
            this.Direction = "up"
        }

        if(this.Direction == "up"){
            this.Main.Y -= this.Speed;
        }
        if(this.Direction == "down"){
            this.Main.Y += this.Speed;
        }

        
    }

    CheckForCollisions(){

        var CenterX = this.Main.X+1/2*this.Main.Width;
        var CenterY = this.Main.Y+1/2*this.Main.Height;
        //true = !this.Saved

        if(this.health >= 0){
            for(var i = 0; i < Char.topGun.Gun.Bullets.length; i++){
                this.DetectCircleCircleCol(CenterX, CenterY, Char.topGun.Gun.Bullets[i].Main.x+5, Char.topGun.Gun.Bullets[i].Main.y-5, i)
            }
        }
    }

    DetectCircleCircleCol(Ax, Ay, Bx, By, Number){
        var distance = Math.sqrt((Ax-Bx)**2+(Ay-By)**2);
        //25 = radius of bullet + target
        if(distance < 23){
            console.log("hit")
            this.health -= 1;
            Char.topGun.Gun.Bullets.splice(Number, 1);
        }
    }

}