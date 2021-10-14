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

        //true = !this.Saved
        if(!this.Saved){
            //left side
            this.DetectLineCollisions(Ax, Ay, Bx, By, CenterX, CenterY, this.Main.Width/2);
            this.DetectLineCollisions(Cx, Cy, Dx, Dy, CenterX, CenterY, this.Main.Width/2);
            this.DetectLineCollisions(Bx, By, Cx, Cy, CenterX, CenterY, this.Main.Width/2);
            this.DetectLineCollisions(Ax, Ay, Dx, Dy, CenterX, CenterY, this.Main.Width/2);
            this.DetectCirclePointCollisions(Ex, Ey);
            this.DetectCirclePointCollisions(Fx, Fy);
        }
    }

    DetectCirclePointCollisions(Cx, Cy){
        var Dist = Math.sqrt((Cx-(this.Main.X+1/2*this.Main.Width))**2+(Cy-(this.Main.Y+1/2*this.Main.Height))**2);
        if(Dist < this.Main.Width/2){
            touchingOne = true;
            if(this.Saved == false && CollectPeople){
                this.Saved = true;
                AmountLeft -= 1;
                CollectPeople = false;
                CanCollectPeople = false;
            }
            if(!this.Saved){
                CanCollectPeople = true;
            }
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
            touchingOne = true;
            if(this.Saved == false && CollectPeople){
                this.Saved = true;
                AmountLeft -= 1;
                CollectPeople = false;
                CanCollectPeople = false;
            }
            if(!this.Saved){
                CanCollectPeople = true;
            }
        } 
    }
}