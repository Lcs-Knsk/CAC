class NavyCharacter{
    constructor(PosX, PosY, Pog, AngleOfThing){
        this.Main = {
            Height: 30,
            Width: 100,
            Y: PosY,
            X: PosX,
        }
        
        this.KeysDown = {
            W: false,
            A: false,
            D: false,
        };

        this.Angle = AngleOfThing;

        this.IdleImg = new Image;
        this.IdleImg.src = "Art/navyBoat.png";

        this.FastBoat = [10];
        this.New1 = new Image;
        this.New2 = new Image;
        this.New3 = new Image;
        this.New4 = new Image;
        this.New5 = new Image;
        this.New6 = new Image;
        this.New1.src = "Art/navyBoatFast1.png";
        this.New2.src = "Art/navyBoatFast2.png";
        this.New3.src = "Art/navyBoatFast3.png";
        this.New4.src = "Art/navyBoatFast4.png";
        this.New5.src = "Art/navyBoatFast5.png";
        this.New6.src = "Art/navyBoatFast6.png";
        this.FastBoat[0] = this.New1;
        this.FastBoat[1] = this.New2;
        this.FastBoat[2] = this.New3;
        this.FastBoat[3] = this.New4;
        this.FastBoat[4] = this.New5;
        this.FastBoat[5] = this.New6;



        this.SpeedTimer = 1000;


        this.Speed = 0;
        this.Acel = 0.0125;
        this.Dcel = .4999;
        this.TempDcel = .499999;
        this.Max = .5
        this.RestingSpeed = .1;
        this.OffSpeed = .05;


        this.Alive = true;
        this.TabbedIn = Pog; //POGGERS NO CAP

        this.BulletA = [];
        
        this.CoolDownMax = 450;
        this.TheCoolTimer = this.CoolDownMax;
        this.CanShoot = true;

        

    }


    Logic(){
        if(this.Alive){
            //Draw
            if(this.KeysDown.W){
                if(this.SpeedTimer > 0){
                    if(this.SpeedTimer < 250){
                        this.Draw(this.FastBoat[3]);
                    }
                    else if(this.SpeedTimer < 500){
                        this.Draw(this.FastBoat[2])
                    }
                    else if(this.SpeedTimer < 750){
                        this.Draw(this.FastBoat[1]);
                    }
                    else{
                        this.Draw(this.FastBoat[0]);
                    }

                    this.SpeedTimer -= 5;
                }
                else{
                    this.Draw(this.FastBoat[5]);
                }
            }
            else{
                this.Draw(this.IdleImg);
                this.SpeedTimer = 1000;
            }



            //Move
            if(this.TabbedIn){
                this.MoveChar();
                this.CrazyCircleStuff();
            }
            else{
                this.Main.X += Math.cos(this.Angle*Math.PI/180)*this.OffSpeed;
                this.Main.Y += -Math.sin(this.Angle*Math.PI/180)*this.OffSpeed;
            }

            //run bullets
            for(var i = 0; i < this.BulletA.length; i++){
                this.BulletA[i].Logic();
            }

            this.ResetBulletAmmo();

            //React
        }

        for(var i = 0; i < this.BulletA.length; i++){
            if(this.BulletA[i].Alive == false){
                var temper = this.BulletA[i].remove;
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


    //Moves the map
    MoveChar(){
        if(this.KeysDown.W){
            if(this.KeysDown.A){
                this.Angle += 0.5;
            }
            if(this.KeysDown.D){
                this.Angle -= 0.5;
            }
        }
        else{
            if(this.KeysDown.A){
                this.Angle += 0.25;
            }
            if(this.KeysDown.D){
                this.Angle -= 0.25;
            }
        }


        //If the player wants to move forwards
        if(this.KeysDown.W){
            this.TempDcel = this.Dcel;
            if(this.Speed < this.Max){
                this.Speed += this.Acel;
            }
            else{
                this.Speed = this.Max;
            }
        }
        //if the player doesn't want to move forwards
        else{
            if(this.Speed > 0.31){
                this.Speed = this.TempDcel;
                this.TempDcel = this.TempDcel**1.1;
            }
            else{
                this.Speed = this.RestingSpeed;
            }


        }

    }

    //does the circle stuff
    CrazyCircleStuff(){
        if(true){
            this.Main.X += Math.cos(this.Angle*Math.PI/180)*this.Speed;
            this.Main.Y += -Math.sin(this.Angle*Math.PI/180)*this.Speed;
        
        }
    }


    ShootTheGun(){
        if(this.CanShoot){
            this.BulletA.push(new Bullet(this.Angle - 2, this.Main.X, this.Main.Y))
            setTimeout(() => {this.BulletA.push(new Bullet(this.Angle+2, this.Main.X, this.Main.Y))}, 300)
            
            this.CanShoot = false;
        }
    }

    ResetBulletAmmo(){
        if(!this.CanShoot){
            if(this.TheCoolTimer <= 0){
                this.CanShoot = true;
                this.TheCoolTimer = this.CoolDownMax;
            }
            else{
                this.TheCoolTimer -= 1;
            }
        }
    }


}