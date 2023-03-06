
class Camera {

    constructor(videoNode) {
        this.videoNode = videoNode;
        console.log('Camera class initialized');
    }

    startCamera() {
        navigator.mediaDevices.getUserMedia({
            audio: false,
            video: { width: 300, height: 300 }
        }).then(stream => {
            this.videoNode.srcObject = stream;
            this.stream = stream;
          });
    }

    stopCamera() {

        //pause video
        this.videoNode.pause();

        //stop stream
        //validate
        if (!this.stream) return;

        this.stream.getTracks()[0].stop();
        }

    takePicture(){
        //Create a canvas element to draw the image
        let canvas = document.createElement('canvas');

        //Set the canvas width and height
        canvas.width = this.videoNode.videoWidth;
        canvas.height = this.videoNode.videoHeight;

        //Get Canvas context
        let context = canvas.getContext('2d');

        //Draw the image
        context.drawImage(this.videoNode, 0, 0, canvas.width, canvas.height);

        //Get the image as a data URL
        this.picture = context.canvas.toDataURL();

        //cleanup canvas
        canvas = null;
        context = null;

        //return the image
        return this.picture;
    };
}
