class MilitaryStandThing{
    constructor(){
        this.Main = {
            X: 630,
            Y: 495,
            Width: 40,
            Height: 70,
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

        this.CharImg = new Image();
        this.CharImg.src = "SpritesAndStuff/SalesCharacter.png"
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
        if(PinsCollected.Navy == 'true') ctx.drawImage(this.NavyImg, 705, 120+40, 180, 120);
        else ctx.drawImage(this.NotGottenPin, 705, 120+40, 180, 120);
        if(PinsCollected.Marines == 'true') ctx.drawImage(this.MarineImg, 410, 120+40, 180, 120);
        else ctx.drawImage(this.NotGottenPin, 410, 120+40, 180, 120);
        if(PinsCollected.CoastGuard == 'true') ctx.drawImage(this.CoastGuardImg, 115, 120+40, 180, 120);
        else ctx.drawImage(this.NotGottenPin, 115, 120+40, 180, 120);

        //second row
        if(PinsCollected.Army == 'true') console.log();
        else ctx.drawImage(this.NotGottenPin, 705, 300+40, 180, 120);
        if(PinsCollected.AirForce == 'true') console.log();
        else ctx.drawImage(this.NotGottenPin, 410, 300+40, 180, 120);
        if(PinsCollected.SpaceForce == 'true') console.log();
        else ctx.drawImage(this.NotGottenPin, 115, 300+40, 180, 120)
        
    }

    DrawPerson(){
        ctx.drawImage(this.CharImg, this.Main.X, this.Main.Y, 40, 70)
    }


    CheckIfHitPin(){
        if(this.MouseHit(705, 160, 180, 120, "Navy")){
            newWin = window.open("CAC-Navy/NavyIndex.html","_self")
        }
        if(this.MouseHit(410, 160, 180, 120, "Marines")){
            newWin = window.open("CAC-Marines/index.htm","_self")
        }
        if(this.MouseHit(115, 160, 180, 120, "Coast Guard")){
            newWin = window.open("CAC-CoastG/index.html","_self")
        }
        if(this.MouseHit(705, 340, 180, 120, "Army")){
            //newWin = window.open("","_self")
        }
        if(this.MouseHit(410, 340, 180, 120, "Air force")){
            newWin = window.open("CAC-Airforce/obsticalCourse.js","_self")
        }
        if(this.MouseHit(115, 340, 180, 120, "Space Force")){
            //newWin = window.open("https://www.youraddress.com","_self")
        }
    }


    MouseHit(PinX, PinY, PinW, PinH, name){
        if(Mouse.X > PinX && Mouse.X < PinX + PinW && Mouse.Y > PinY && Mouse.Y < PinY + PinH){
            //send to that game
            return true
        }
    }


}