class IslandMap{
    constructor(){
        //These two vars are the coords for the top left of the map generation
        this.MapX = 0;
        this.MapY = 0;

        this.ScreenWidth = 600;
        this.ScreenHeight = 400;

        this.mapThing = new Image;
        this.mapThing.src = "SpritesAndStuff/cacTrueMap.png"     
    }

    DrawMap(){
        ctx.drawImage(this.mapThing, this.MapX, this.MapY, this.ScreenWidth, this.ScreenHeight, 0, 0, 1000, 800);
    }
}
