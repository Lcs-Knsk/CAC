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

                this.DeadTimer -= 2;
            }
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