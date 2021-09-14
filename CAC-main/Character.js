class Character{
    constructor(XPos, YPos){
        this.Main = {
            X: XPos,
            Y: YPos,

            Height: 64,
            Width: 48,

            Speed: 1.5,
        }

        //contains all of the movement variables of the character
        this.Move = {
            Left: false,
            Right: false,
            Up: false,
            Down: false
        }

        //contains all of the animation variables
        this.Anim = {
            FrameRow: 0,
            PlayerImage: new Image,

            FrameWidth: 48,
            FrameHeight: 63,

            FrameNumber: 0,
            HighFrameNumber: 3,
            Animate: true
        }

        this.Anim.PlayerImage.src = "SpritesAndStuff/NewChar.png";

    }

    Loop(){
        //Movement
        this.MoveChar();

        //Draw
        this.Animation();

        //Collisions

    }



    //Moves the map
    MoveChar(){
        if(this.Move.Down){
            Imap.MapY += this.Main.Speed;
        }
        if(this.Move.Left){
            Imap.MapX -= this.Main.Speed;
        }
        
        if(this.Move.Right){
            Imap.MapX += this.Main.Speed;
        }
        if(this.Move.Up){
            Imap.MapY -= this.Main.Speed;
        }


    }

    //draws the player
    Animation(){
        //sets what row the animaiton should be playing on
        this.DetectAnimRow();

        if(this.Anim.Animate){
            ctx.drawImage(this.Anim.PlayerImage, (this.Anim.FrameWidth+16)*this.Anim.FrameNumber, this.Anim.FrameHeight*this.Anim.FrameRow,
            this.Anim.FrameWidth, this.Anim.FrameHeight, this.Main.X, this.Main.Y, this.Anim.FrameWidth, this.Anim.FrameHeight);
        }
        else{
            ctx.drawImage(this.Anim.PlayerImage, (this.Anim.FrameWidth+16)*1, this.Anim.FrameHeight*0,
                this.Anim.FrameWidth, this.Anim.FrameHeight, this.Main.X, this.Main.Y, this.Anim.FrameWidth, this.Anim.FrameHeight);
        }


    }

    DetectAnimRow(){
        if(this.Move.Right){
            this.Anim.FrameRow = 2;
            this.Anim.Animate = true;
        }
        else if(this.Move.Left){
            this.Anim.FrameRow = 1;
            this.Anim.Animate = true;
        }
        else if(this.Move.Down){
            this.Anim.FrameRow = 0;
            this.Anim.Animate = true;
        }
        else if(this.Move.Up){
            this.Anim.FrameRow = 3;
            this.Anim.Animate = true;
        }
        else{
            //makes the animation stop||plays idle animation(not really an animation though)
            this.Anim.Animate = false;
        }
    }

}
