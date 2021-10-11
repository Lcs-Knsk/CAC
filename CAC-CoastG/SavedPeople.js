class SavePerson{
    constructor(XPos, YPos){
        this.Main = {
            X: XPos,
            Y: YPos,
            GX: XPos,
            GY: YPos,
            Height: 22,
            Width: 30,
        }


        this.Img = new Image;
        this.Img.src = "Art/LifeBuoy.png";

        this.Saved = false;
    }

    Logic(){
        if(!this.Saved){
            //Update position
            this.UpdatePosition();

            //draw
            this.Draw();

        }
    }

    Draw(){
        ctx.drawImage(this.Img, this.Main.X, this.Main.Y, this.Main.Width, this.Main.Height);
    }

    UpdatePosition(){
        this.Main.X = this.Main.GX - ScreenPos.X;
        this.Main.Y = this.Main.GY + ScreenPos.Y;
    }

    CheckForCollisions(Ax, Ay, Bx, By, Cx, Cy, Dx, Dy, Ex, Ey, Fx, Fy, Char){

        var CenterX = this.Main.X+1/2*this.Main.Width;
        var CenterY = this.Main.Y+1/2*this.Main.Height;

        if(!this.Saved){
            //left side
            var Hit = this.DetectLineCollisions(Ax, Ay, Bx, By, CenterX, CenterY, this.Main.Width/2);
            if(Hit){

                if(this.Saved == false){
                    this.Saved = true;
                    console.log("Saved")
                    AmountLeft -= 1;
                }
            };

            //mid line
            var Hit = this.DetectLineCollisions(Ex, Ey, Fx, Fy, CenterX, CenterY, this.Main.Width/2);
            if(Hit){

                if(this.Saved == false){
                    this.Saved = true;
                    console.log("Saved")
                    AmountLeft -= 1;
                }
            };



            //top side
            var Hit = this.DetectLineCollisions(Cx, Cy, Dx, Dy, CenterX, CenterY, this.Main.Width/2);
            if(Hit){

                if(this.Saved == false){
                    this.Saved = true;
                    console.log("Saved")
                    AmountLeft -= 1;
                }
            };

            //right side
            var Hit = this.DetectLineCollisions(Bx, By, Cx, Cy, CenterX, CenterY, this.Main.Width/2);
            if(Hit){

                if(this.Saved == false){
                    this.Saved = true;
                    console.log("Saved")
                    AmountLeft -= 1;
                }
            };

            //bottom side
            var Hit = this.DetectLineCollisions(Ax, Ay, Dx, Dy, CenterX, CenterY, this.Main.Width/2);
            if(Hit){

                if(this.Saved == false){
                    this.Saved = true;
                    console.log("Saved")
                    AmountLeft -= 1;
                }

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