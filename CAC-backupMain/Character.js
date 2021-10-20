class Character{
    constructor(XPos, YPos){
        this.Main = {
            X: XPos,
            Y: YPos,

            Height: 64,
            Width: 48,

            XSpeed: 2,
            YSpeed: 1.5,
            Angle: "Nothing",
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

            FrameWidth: 50,
            FrameHeight: 64,

            FrameNumber: 1,
            HighFrameNumber: 3,
            Animate: true
        }

        this.Anim.PlayerImage.src = "SpritesAndStuff/Char.png";

        this.KCombo = ["nothing", "nothing", "nothing"]
        
        this.KeysDown = {
            W: false,
            A: false,
            S: false,
            D: false,
        };
    
    }

    Loop(){
        //Movement
        this.MoveChar();
        this.CrazyCircleStuff();



        //Draw
        this.Animation();

        //Collisions

    }



    //Moves the map
    MoveChar(){
        if(this.KCombo[0] == "left" && this.KCombo[1] == "up" && this.KCombo[2] == "XMove"){
            this.Main.Angle = (5/6)*Math.PI;
        }
        else if(this.KCombo[0] == "left" && this.KCombo[1] == "down" && this.KCombo[2] == "XMove"){
            this.Main.Angle = (7/6)*Math.PI;
        }
        else if(this.KCombo[0] == "left" && this.KCombo[1] == "nothing" && this.KCombo[2] == "XMove"){
            this.Main.Angle = Math.PI
        }        
        else if(this.KCombo[0] == "right" && this.KCombo[1] == "up" && this.KCombo[2] == "XMove"){
            this.Main.Angle = (1/6)*Math.PI            
        }
        else if(this.KCombo[0] == "right" && this.KCombo[1] == "down" && this.KCombo[2] == "XMove"){
            this.Main.Angle = (11/6)*Math.PI
        }
        else if(this.KCombo[0] == "right" && this.KCombo[1] == "nothing" && this.KCombo[2] == "XMove"){
            this.Main.Angle = 0;
        }
        else if(this.KCombo[0] == "left" && this.KCombo[1] == "up" && this.KCombo[2] == "YMove"){
            this.Main.Angle = (4/6)*Math.PI
        }
        else if(this.KCombo[0] == "right" && this.KCombo[1] == "up" && this.KCombo[2] == "YMove"){
            this.Main.Angle = (2/6)*Math.PI
        }
        else if(this.KCombo[0] == "nothing" && this.KCombo[1] == "up" && this.KCombo[2] == "YMove"){
            this.Main.Angle = (3/6)*Math.PI
        }
        else if(this.KCombo[0] == "left" && this.KCombo[1] == "down" && this.KCombo[2] == "YMove"){
            this.Main.Angle = (8/6)*Math.PI
        }
        else if(this.KCombo[0] == "right" && this.KCombo[1] == "down" && this.KCombo[2] == "YMove"){
            this.Main.Angle = (10/6)*Math.PI
        }
        else if(this.KCombo[0] == "nothing" && this.KCombo[1] == "down" && this.KCombo[2] == "YMove"){
            this.Main.Angle = (9/6)*Math.PI
        }
        else{
            this.Main.Angle = "Nothing"
        }
    }

    //does the circle stuff
    CrazyCircleStuff(){
        if(this.Main.Angle != "Nothing"){
            this.Main.X += Math.cos(this.Main.Angle)*this.Main.XSpeed;
            this.Main.Y += -Math.sin(this.Main.Angle)*this.Main.YSpeed;
        }
    }

    //draws the player
    Animation(){
        //sets what row the animaiton should be playing on
        this.DetectAnimRow();

        ctx.drawImage(this.Anim.PlayerImage, (this.Anim.FrameWidth)*this.Anim.FrameNumber, this.Anim.FrameHeight*this.Anim.FrameRow,
        this.Anim.FrameWidth, this.Anim.FrameHeight, this.Main.X, this.Main.Y, this.Anim.FrameWidth, this.Anim.FrameHeight);

    }

    DetectAnimRow(){
        if(this.KCombo[2] == "YMove" && this.KCombo[1] == "down"){
            this.Anim.FrameRow = 0;
            this.Anim.Animate = true;
        }
        else if(this.KCombo[2] == "YMove" && this.KCombo[1] == "up"){
            this.Anim.FrameRow = 3;
            this.Anim.Animate = true;
        }
        else if(this.KCombo[2] == "XMove" && this.KCombo[0] == "right"){
            this.Anim.FrameRow = 2;
            this.Anim.Animate = true;
        }
        else if(this.KCombo[2] == "XMove" && this.KCombo[0] == "left"){
            this.Anim.FrameRow = 1;
            this.Anim.Animate = true;
        }
        else{
            //makes the animation stop||plays idle animation(not really an animation though)
            this.Anim.Animate = false;
        }

    }

}
