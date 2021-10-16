class helpfulFunction{

    Geometry = {
        findEdgeOfCircle: {
            //find the x coord on the outer ring of a circle given a specified rotation
            findX: function(CenterOfCircle, CircleRadius, Rotation, OffsetOfCircle){
                return CenterOfCircle + ((CircleRadius/OffsetOfCircle))*Math.sin(Rotation);
            },
            //finds the y coord on the ring of a circle given a specified rotation
            findY: function(CenterOfCircle, CircleRadius, Rotation, OffsetOfCircle){
                return CenterOfCircle + -((CircleRadius/OffsetOfCircle))*Math.cos(Rotation);
            },
        }
    }

    //deals with all of the rotating image functions
    rotateImage = {
        //rotates an image on the canvas, it is rotated by the degrees specified
        Degree: function(degrees, XOfImage, YOfImage, objectImg, WOfImage, HOfImage) {
            // save the unrotated context of the canvas so we can restore it later
            // the alternative is to untranslate & unrotate after drawing
            ctx.save();

            // move to the center of the canvas
            ctx.translate(XOfImage, YOfImage);

            // rotate the canvas to the specified degrees
            ctx.rotate(degrees * Math.PI / 180);

            // draw the image
            ctx.drawImage(objectImg, -WOfImage/2, -HOfImage/2, WOfImage, HOfImage);


            // we’re done with the rotating so restore the unrotated context
            ctx.restore();

        },

        //rotates an image on the canvas, it is rotated by the radians specified
        Radian: function(radian, XOfImage, YOfImage, objectImg, WOfImage, HOfImage){
            // save the unrotated context of the canvas so we can restore it later
            // the alternative is to untranslate & unrotate after drawing
            ctx.save();

            // move to the center of the canvas
            ctx.translate(XOfImage, YOfImage);

            // rotate the canvas to the specified degrees
            ctx.rotate(radian);

            // draw the image
            ctx.drawImage(objectImg, -WOfImage/2, -HOfImage/2, WOfImage, HOfImage);


            // we’re done with the rotating so restore the unrotated context
            ctx.restore();
        }
    }    
}