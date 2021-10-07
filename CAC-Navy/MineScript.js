class MineField{
    constructor(XPos, YPos){
        this.Main = {
            X: XPos,
            Y: YPos,
            Height: 25,
            Width: 25,
        }

        this.Img = new Image;
        this.Img.src = "Art/MineThing.png";
        this.Angle = 90;
        this.Blown = false;

    }

    Logic(){
        //Draw
        this.Draw(this.Img)
        //Detect Collisions

        this.CheckForCollisions();

    }

    Draw(Image){
        ctx.translate(this.Main.X, this.Main.Y);
        ctx.rotate(-this.Angle*Math.PI/180);
        ctx.drawImage(Image, -this.Main.Width / 2, -this.Main.Height / 2, this.Main.Width, this.Main.Height);
        ctx.rotate(this.Angle*Math.PI/180);
        ctx.translate(-this.Main.X, -this.Main.Y);
    }


    CheckForCollisions(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, Char){
        var NumberThing = Char;
        if(!this.Blown){
            var Hit = this.DetectLineCollisions(Ax, Ay, Bx, By, this.Main.X, this.Main.Y, this.Main.Width/2);
            if(Hit){
                char[NumberThing].Alive = false
                console.log("Left")
                this.Blown = true;
            };



            //top side
            var Hit = this.DetectLineCollisions(Cx, Cy, Dx, Dy, this.Main.X, this.Main.Y, this.Main.Width/2);
            if(Hit){
                char[NumberThing].Alive = false
                console.log("Front")
                this.Blown = true;
            };

            //right side
            var Hit = this.DetectLineCollisions(Bx, By, Cx, Cy, this.Main.X, this.Main.Y, this.Main.Width/2);
            if(Hit){
                char[NumberThing].Alive = false
                console.log("right")
                this.Blown = true;
            };

            //bottom side
            var Hit = this.DetectLineCollisions(Ax, Ay, Dx, Dy, this.Main.X, this.Main.Y, this.Main.Width/2);
            if(Hit){
                console.log("bottom")
                char[NumberThing].Alive = false
                this.Blown = true;
            };
        }
    }

    DetectLineCollisions(AlX, AlY, BlX, BlY, ClX, ClY, Rad){
        var Bx = BlX;
        var By = BlY;
        var Ax = AlX;
        var Ay = AlY;
        var Cx = ClX;
        var Cy = ClY;
        var R = Rad;


        // compute the triangle area times 2 (area = area2/2)
        var area2 = (Math.sqrt( (Bx-Ax)**2 + (By-Ay)**2))*(Math.sqrt((Cx-Ax)**2 + (Cy-Ay)**2))
        
        // compute the AB segment length
        var LAB = Math.sqrt((Bx-Ax)**2 + (By-Ay)**2)

        // compute the triangle height
        var h = area2/LAB

        // if the line intersects the circle
        if( h < R )
        {
            return true;
        } 
    }
}