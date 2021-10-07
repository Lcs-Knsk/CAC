class Bullet{
    constructor(WhichAngle, XCoord, YCoord){    
        this.Number = [];
        this.Speed = Math.floor(Math.random() * .25 + 1);
        this.Width = 10;
        this.Height = 10;
        this.Angle = WhichAngle;

        this.Pos = {
            X: XCoord,
            Y: YCoord,
        }

        this.BulImg = new Image;
        this.BulImg.src = "Art/bullet.png"

        this.Alive = true;

        
    }

    Logic(){
        if(this.Alive){
            //draw
            this.Draw();
            //move positions
            this.Move();
            //collisions


            for(var i = 0; i < enem.length; i++){
                if(enem[i].Alive) this.Collisions(enem[i]); 
                ctx.fillStyle = "black";
                
            }

            //check for outside borders
            this.CheckForOut();

        }


    }

    CheckForOut(){
        if(this.Pos.X > 1200){
            this.Alive = false;
        }
        else if(this.Pos.X < -100){
            this.Alive =false;
        }
        else if(this.Pos.Y > 700){
            this.Alive = false;
        }
        else if(this.Pos.Y < -100){
            this.Alive = false;
        }
    }

    Draw(){
        ctx.fillStyle = "black";
        ctx.drawImage(this.BulImg, this.Pos.X, this.Pos.Y);

        
    }

    Move(){
        this.Pos.X += Math.cos(this.Angle*Math.PI/180)*this.Speed;
        this.Pos.Y += -Math.sin(this.Angle*Math.PI/180)*this.Speed;
    }

    Collisions(Object){
        
        if(Object.Angle == 90 || Object.Angle == 270){
            if(Object.Main.X - 18 < this.Pos.X + 10){
                if(Object.Main.X + 18 > this.Pos.X){
                    if(Object.Main.Y - 34 < this.Pos.Y + 10){
                        if(Object.Main.Y + 34 > this.Pos.Y){
                            this.Alive = false;
                            Object.Health -= 2;
                        }
                    }
                }
            }
        }
        else{
            if(Object.Main.X - 34 < this.Pos.X + 10){
                if(Object.Main.X + 34 > this.Pos.X){
                    if(Object.Main.Y - 18 < this.Pos.Y + 10){
                        if(Object.Main.Y + 18 > this.Pos.Y){
                            this.Alive = false;
                            Object.Health -= 2;
                        }
                    }
                }
            }
        }
        





    }
}