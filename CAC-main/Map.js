class IslandMap{
    constructor(){
        this.MapX = 400;
        this.MapY = 400;

        this.MapWidth = 400;
        this.MapHeight = 400;

        this.mapThing = new Image;
        this.mapThing.src = "SpritesAndStuff/cacTrueMap.png"     
    }

    DrawMap(){
        ctx.drawImage(this.mapThing, this.MapX, this.MapY, this.MapWidth, this.MapHeight, 0, 0, 800, 800);
    }
}