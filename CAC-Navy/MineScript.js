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

        this.Animation = [5];
        this.Animation[0] = new Image;
        this.Animation[0].src = "Art/MineBoom1.png";
        this.Animation[1] = new Image;
        this.Animation[1].src = "Art/MineBoom2.png";
        this.Animation[2] = new Image;
        this.Animation[2].src = "Art/MineBoom3.png";
        this.Animation[3] = new Image;
        this.Animation[3].src = "Art/MineBoom4.png";
        this.Animation[4] = new Image;
        this.Animation[4].src = "Art/MineBoom5.png";

        this.AnimationTimer = 1000;

    }

    Logic(){

        //Detect Collisions

        this.CheckForCollisions();
        
        if(!this.Blown){
            //Draw
            this.Draw()
        }
        else{
            this.PlayAnimation();
        }

    }

    Draw(){
        ctx.translate(this.Main.X, this.Main.Y);
        ctx.rotate(-this.Angle*Math.PI/180);
        ctx.drawImage(this.Img, -this.Main.Width / 2, -this.Main.Height / 2, this.Main.Width, this.Main.Height);
        ctx.rotate(this.Angle*Math.PI/180);
        ctx.translate(-this.Main.X, -this.Main.Y);
    }


    CheckForCollisions(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, Ex, Ey, Fx, Fy, Char){
        var NumberThing = Char;
        if(!this.Blown){
            //left side
            var Hit = this.DetectLineCollisions(Ax, Ay, Bx, By, this.Main.X, this.Main.Y, this.Main.Width/2);
            if(Hit){
                char[NumberThing].Alive = false
                console.log("Left")
                this.Blown = true;
            };

            //mid line
            var Hit = this.DetectLineCollisions(Ex, Ey, Fx, Fy, this.Main.X, this.Main.Y, this.Main.Width/2);
            if(Hit){
                char[NumberThing].Alive = false
                console.log("MidLine")
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

    PlayAnimation(){
        if(this.AnimationTimer > 0){
            if(this.AnimationTimer < 200){
                this.Draw(this.Animation[4]);
            }
            else if(this.AnimationTimer < 400){
                this.Draw(this.Animation[3]);
            }
            else if(this.AnimationTimer < 600){
                this.Draw(this.Animation[2]);
            }
            else if(this.AnimationTimer < 800){
                this.Draw(this.Animation[1]);
            }
            else if(this.AnimationTimer < 1000){
                this.Draw(this.Animation[0]);
            }

            if(this.AnimationTimer == 1000){
                BlowUpBomb.play();
            }

            this.AnimationTimer -= 10;

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