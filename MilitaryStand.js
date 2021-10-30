class MilitaryStandThing{
    constructor(){
        this.Main = {
            X: 630,
            Y: 480,
            Width: 48,
            Height: 94,
        }

        this.CoastGuardImg = new Image();
        this.MarineImg = new Image();
        this.NavyImg = new Image();
        this.SpaceforceImg = new Image();
        this.AirforceImg = new Image();
        this.ArmyImg = new Image();

        this.NotGottenPin = new Image();
        this.NotGottenPin.src = "SpritesAndStuff/NotGottenPin.png";

        this.CoastGuardImg.src = "SpritesAndStuff/GottenPin.png";
        this.MarineImg.src = "SpritesAndStuff/MarinePin.png";
        this.NavyImg.src = "SpritesAndStuff/NavyPin.png";
        this.SpaceforceImg.src = "SpritesAndStuff/SpaceForcePin.png";
        this.AirforceImg.src = "SpritesAndStuff/AirForcePin.png"
        this.ArmyImg.src = "SpritesAndStuff/ArmyPin.png";

        this.InMenu = false;
        this.Colliding = false;

        this.CharImg = new Image();
        this.CharImg.src = "SpritesAndStuff/NewSalesCharacter.png"
    }

    Logic(){
        //draw right thing
        if(!this.InMenu){
            this.DrawPerson();
        }
        else{
            this.DrawPerson();
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

        ctx.font = "80px Trebuchet MS"
        ctx.fillStyle = "Black";
        ctx.fillText("Cacitary", 360, 120);

        ctx.font = "40px Trebuchet MS";
        ctx.fillStyle = "white"


        //first row
        ctx.fillText("Navy", 750, 230);
        if(PinsCollected.Navy == 'true') ctx.drawImage(this.NavyImg, 705, 120+40, 180, 120);
        else ctx.drawImage(this.NotGottenPin, 705, 120+40, 180, 120);

        ctx.fillText("Marines", 432, 230)
        if(PinsCollected.Marines == 'true') ctx.drawImage(this.MarineImg, 410, 120+40, 180, 120);
        else ctx.drawImage(this.NotGottenPin, 410, 120+40, 180, 120);

        ctx.font = "30px Trebuchet MS"
        ctx.fillText("Coast", 170, 215)
        ctx.fillText("Guard", 167, 245)
        if(PinsCollected.CoastGuard == 'true') ctx.drawImage(this.CoastGuardImg, 115, 120+40, 180, 120);
        else ctx.drawImage(this.NotGottenPin, 115, 120+40, 180, 120);

        //second row
        ctx.font = "40px Trebuchet MS";
        ctx.fillText("Army", 750, 410)
        if(PinsCollected.Army == 'true') ctx.drawImage(this.ArmyImg, 705, 300+40, 180, 120)
        else ctx.drawImage(this.NotGottenPin, 705, 300+40, 180, 120);

        ctx.font = "30px Trebuchet MS"
        ctx.fillText("Air", 480, 395)
        ctx.fillText("Force", 465, 425)
        if(PinsCollected.Airforce == 'true') ctx.drawImage(this.AirforceImg, 410, 340, 180, 120);
        else ctx.drawImage(this.NotGottenPin, 410, 300+40, 180, 120);

        ctx.font = "30px Trebuchet MS"
        ctx.fillText("Space", 170, 395)
        ctx.fillText("Force", 170, 425)
        if(PinsCollected.Spaceforce == 'true') ctx.drawImage(this.SpaceforceImg, 115, 340, 180, 120);
        else ctx.drawImage(this.NotGottenPin, 115, 300+40, 180, 120)
        
    }

    DrawPerson(){
        ctx.drawImage(this.CharImg, this.Main.X, this.Main.Y, this.Main.Width, this.Main.Height)
    }


    CheckIfHitPin(){
        if(this.MouseHit(705, 160, 180, 120, "Navy") && PinsCollected.Navy == "false" && this.InMenu){
            newWin = window.open("CAC-Navy/NavyIndex.html","_self")
        }
        if(this.MouseHit(410, 160, 180, 120, "Marines") && PinsCollected.Marines == "false" && this.InMenu){
            newWin = window.open("CAC-Marines/index.htm","_self")
        }
        if(this.MouseHit(115, 160, 180, 120, "Coast Guard") && PinsCollected.CoastGuard == "false" && this.InMenu){
            newWin = window.open("CAC-CoastG/index.html","_self")
        }
        if(this.MouseHit(705, 340, 180, 120, "Army") && PinsCollected.Army == "false" && this.InMenu){
            newWin = window.open("CAC-Army/army.html","_self")
        }
        if(this.MouseHit(410, 340, 180, 120, "Air force") && PinsCollected.Airforce == "false" && this.InMenu){
            newWin = window.open("CAC-Airforce/obsticalCourse.html","_self")
        }
        if(this.MouseHit(115, 340, 180, 120, "Space Force") && PinsCollected.Spaceforce == "false" && this.InMenu){
            newWin = window.open("CAC-Spaceforce/index.html", "_self");
            console.log('hit')
        }
    }


    MouseHit(PinX, PinY, PinW, PinH, name){
        if(Mouse.X > PinX && Mouse.X < PinX + PinW && Mouse.Y > PinY && Mouse.Y < PinY + PinH){
            //send to that game
            return true
        }
    }


}
