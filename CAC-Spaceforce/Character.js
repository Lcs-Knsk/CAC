class Character{
    constructor(){
        this.Main = {
            X: 200,
            Y: 200,
            Height: 85.25,
            Width: 44
        }

        this.Angles = {
            Reg: 90,
            Up: 80,
            Down: 100,
        }
        this.Angle = 90;

        this.Speed = 2.5;

        this.Img = new Image();
        this.Img.src = "Art/SpaceShip.png";

        this.Alive = true;
    }

    Logic(){
        //draw 
        this.Rotate(this.Angle, this.Main.X, this.Main.Y, this.Img, this.Main.Width, this.Main.Height);
        //move up and down
        this.Move();

        //Check for meteor collisions
        this.DetectCollisions();

    }

    Move(){
        if(KeysDown.W || KeysDown.Up){
            if(this.Main.Y >= 20) this.Main.Y -= this.Speed;
            this.Angle = this.Angles.Up
        }
        if(KeysDown.S || KeysDown.Down){
            if(this.Main.Y <= 580) this.Main.Y += this.Speed;
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

    DetectCollisions(){
        var Ax = this.Main.X + Math.cos((this.Angle-28)*Math.PI/180)*28;
        var Ay = this.Main.Y - Math.sin((this.Angle-28)*Math.PI/180)*28;
        var Bx = this.Main.X + Math.cos((this.Angle+28)*Math.PI/180)*36;
        var By = this.Main.Y - Math.sin((this.Angle+28)*Math.PI/180)*36;
        var Cx = this.Main.X + Math.cos((this.Angle-90-28)*Math.PI/180)*28;
        var Cy = this.Main.Y - Math.sin((this.Angle-90-28)*Math.PI/180)*28;
        var Dx = this.Main.X + Math.cos((this.Angle+90+28)*Math.PI/180)*36; 
        var Dy = this.Main.Y - Math.sin((this.Angle+90+28)*Math.PI/180)*36;
        var Ex = this.Main.X;
        var Ey = this.Main.Y;

        for(var i = 0; i < MeteorsVar.length; i++){
            var Hit = this.CheckCol(Ax, Ay, MeteorsVar[i].Main.X+20, MeteorsVar[i].Main.Y+20, 20);
            if(Hit){
                this.Alive = false;
                console.log("Ax")
            }
            var Hit = this.CheckCol(Bx, By, MeteorsVar[i].Main.X+20, MeteorsVar[i].Main.Y+20, 20)
            if(Hit){
                this.Alive = false;
                console.log("Bx")
            }
            var Hit = this.CheckCol(Cx, Cy, MeteorsVar[i].Main.X+20, MeteorsVar[i].Main.Y+20, 20)
            if(Hit){
                this.Alive = false;
                console.log("Cx")
            }
            var Hit = this.CheckCol(Dx, Dy, MeteorsVar[i].Main.X+20, MeteorsVar[i].Main.Y+20, 20)
            if(Hit){
                this.Alive = false;
                console.log("Dx")
            }
            var Hit = this.CheckCol(Ex, Ey, MeteorsVar[i].Main.X+20, MeteorsVar[i].Main.Y+20, 20)
            if(Hit){
                this.Alive = false;
                console.log("Ex")
            }
        }

    }

    CheckCol(Ax, Ay, Cx, Cy, R){
        var dist = Math.sqrt((Ax-Cx)**2+(Ay-Cy)**2);
        if(dist < R){
            console.log("collision");
            return true;
        }
    }
}