class EnemyBoat{
    constructor(XPos, YPos, AngleOfThing){
        this.Main = {
            X: XPos,
            Y: YPos,

            Height: 50,
            Width: 100,   
        }

        this.Angle = AngleOfThing;
        this.Img = new Image;
        this.Img.src = "Art/OtherBoatThing.png"

        this.Health = 2;


        this.Alive = true;
        this.PassOver = false;
        
        this.BrokenBoats = [4];
        this.New1 = new Image;
        this.New2 = new Image;
        this.New3 = new Image;
        this.New4 = new Image;
        this.New1.src = "Art/brokenBoat.png";
        this.New2.src = "Art/brokenBoat2.png";
        this.New3.src = "Art/brokenBoat3.png";
        this.New4.src = "Art/brokenBoat4.png";
        this.BrokenBoats[0] = this.New1;
        this.BrokenBoats[1] = this.New2;
        this.BrokenBoats[2] = this.New3;
        this.BrokenBoats[3] = this.New4;

        this.DeadTimer = 1000;
    }

    Logic(){
        if(this.Health >= 0){
            this.Alive = true;
        }
        else{
            this.Alive = false;
        }
        
        if(this.Alive){
            //draw
            this.Draw(this.Img);

            //detect collisions
        }
        else{
            if(this.DeadTimer > 0){
                if(this.DeadTimer < 250){
                    this.Draw(this.BrokenBoats[3]);
                }
                else if(this.DeadTimer < 500){
                    this.Draw(this.BrokenBoats[2]);
                    this.PassOver = true;
                }
                else if(this.DeadTimer < 750){
                    this.Draw(this.BrokenBoats[1])
                }
                else if(this.DeadTimer < 1000){
                    this.Draw(this.BrokenBoats[0]);
                }

                if(this.DeadTimer == 1000){
                    ShipBlown.play();
                }

                this.DeadTimer -= 2;
            }
        }


    }
    CheckForCollisions(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, Ex, Ey, Fx, Fy, Char){
        var NumberThing = Char;
        if(this.Alive){
            //left side
            var Hit = this.DetectLineCollisions(Ax, Ay, Bx, By, this.Main.X, this.Main.Y, 32);
            if(Hit){
                char[NumberThing].Alive = false
                console.log("Left")
                this.Health = -2;
            };

            //mid line
            var Hit = this.DetectLineCollisions(Ex, Ey, Fx, Fy, this.Main.X, this.Main.Y, 32);
            if(Hit){
                char[NumberThing].Alive = false
                console.log("MidLine")
                this.Health = -2;
            };



            //top side
            var Hit = this.DetectLineCollisions(Cx, Cy, Dx, Dy, this.Main.X, this.Main.Y, 32);
            if(Hit){
                char[NumberThing].Alive = false
                console.log("Front")
                this.Health = -2;
            };

            //right side
            var Hit = this.DetectLineCollisions(Bx, By, Cx, Cy, this.Main.X, this.Main.Y, 32);
            if(Hit){
                char[NumberThing].Alive = false
                console.log("right")
                this.Health = -2;
            };

            //bottom side
            var Hit = this.DetectLineCollisions(Ax, Ay, Dx, Dy, this.Main.X, this.Main.Y, 32);
            if(Hit){
                console.log("bottom")
                char[NumberThing].Alive = false
                this.Health = -2;
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

    Draw(Image){
        ctx.translate(this.Main.X, this.Main.Y);
        ctx.rotate(-this.Angle*Math.PI/180);
        ctx.drawImage(Image, -this.Main.Width / 2, -this.Main.Height / 2, this.Main.Width, this.Main.Height);
        ctx.rotate(this.Angle*Math.PI/180);
        ctx.translate(-this.Main.X, -this.Main.Y);
    }


}