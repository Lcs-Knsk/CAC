class IslandMap{
    constructor(){
        this.MapX = 2000;
        this.MapY = 400;

        this.ScreenWidth = 600;
        this.ScreenHeight = 400;

        this.mapThing = new Image;
        this.mapThing.src = "SpritesAndStuff/Island.png"     
    }

    DrawMap(){
        ctx.drawImage(this.mapThing, this.MapX, this.MapY, this.ScreenWidth, this.ScreenHeight, 0, 0, 1000, 800);
    }
}
