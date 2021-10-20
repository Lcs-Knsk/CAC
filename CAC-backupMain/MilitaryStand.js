class MilitaryStandThing{
    constructor(){
        this.Main = {
            X: 630,
            Y: 490,
            Width: 40,
            Height: 70,
        }

        this.Pins = {
            Navy: false,
            Marine: false,
            CoastGuard: false,
            Army: false,
            AirForce: false,
            SpaceForce: false,
        }

        this.CoastGuardImg = new Image();
        this.MarineImg = new Image();
        this.NavyImg = new Image();

        this.NotGottenPin = new Image();
        this.NotGottenPin.src = "SpritesAndStuff/NotGottenPin.png";

        this.CoastGuardImg.src = "SpritesAndStuff/GottenPin.png";
        this.MarineImg.src = "SpritesAndStuff/MarinePin.png";
        this.NavyImg.src = "SpritesAndStuff/NavyPin.png";

        this.InMenu = false;
        this.Colliding = false;
    }

    Logic(){
        //draw right thing
        if(!this.InMenu){
            this.DrawPerson();
        }
        else{
            this.DrawMenu();
        }
        //check if colliding with person
        if(char.Main.X > 520 && !this.InMenu){
            this.Colliding = true;
            console.log(true);

            ctx.font = "40px Trebuchet MS";
            ctx.fillStyle = "white"
            ctx.fillText('Press "E" to talk', 400, 50);
        }
        else{
            this.Colliding = false;
        }


    }

    DrawMenu(){
        ctx.GlobalAlpha = 0.002;
        ctx.fillStyle = "rgb(255, 255, 255, 0.3)";
        ctx.fillRect(0, 0, 1000, 600);

        //first row
        if(this.Pins.Navy) ctx.drawImage(this.NavyImg, 705, 120+40, 180, 120);
        else ctx.drawImage(this.NotGottenPin, 705, 120+40, 180, 120);
        if(this.Pins.Marine) ctx.drawImage(this.MarineImg, 410, 120+40, 180, 120);
        else ctx.drawImage(this.NotGottenPin, 410, 120+40, 180, 120);
        if(this.Pins.CoastGuard) ctx.drawImage(this.CoastGuardImg, 115, 120+40, 180, 120);
        else ctx.drawImage(this.NotGottenPin, 115, 120+40, 180, 120);

        //second row
        if(this.Pins.Army) console.log("draw army pin");
        else ctx.drawImage(this.NotGottenPin, 705, 300+40, 180, 120);
        if(this.Pins.AirForce) console.log("draw airforce pin");
        else ctx.drawImage(this.NotGottenPin, 410, 300+40, 180, 120);
        if(this.Pins.SpaceForce) console.log("draw spaceforce pin");
        else ctx.drawImage(this.NotGottenPin, 115, 300+40, 180, 120)
        
    }

    DrawPerson(){
        ctx.fillStyle = "red";
        ctx.fillRect(this.Main.X, this.Main.Y, this.Main.Width, this.Main.Height);
    }


    CheckIfHitPin(){
        this.MouseHit(705, 160, 180, 120, "Navy");
        this.MouseHit(410, 160, 180, 120, "Marines");
        this.MouseHit(115, 160, 180, 120, "Coast Guard");
        this.MouseHit(705, 340, 180, 120, "Army");
        this.MouseHit(410, 340, 180, 120, "Air force");
        this.MouseHit(115, 340, 180, 120, "Space Force");
    }


    MouseHit(PinX, PinY, PinW, PinH, name){
        if(Mouse.X > PinX && Mouse.X < PinX + PinW && Mouse.Y > PinY && Mouse.Y < PinY + PinH){
            //send to that game
            console.log(name)
        }
    }


}