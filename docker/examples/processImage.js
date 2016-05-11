
var Gesture = require('../lib/gesture');

if(!process.argv[2]){
  console.log("-- Use :   node processImage.js <path_to_image>");
  process.exit(1);
}

var fs = require('fs')
var gesture = new Gesture.detector();
gesture.setTimeToCountDetection(5);
gesture.setDraw(true);
var filename = process.argv[2];
var bufferImage;


fs.readFile(filename,onReadImage);


function onReadImage(error, data) { 
	 if(!error){
	 	 bufferImage = new Buffer(data);
     gesture.detect(bufferImage, Gesture.PALM, onDetectionResponse);
	 }else{
	 	console.log(error);
	 } 
}


function onDetectionResponse(error, response){
  if(!error){
   console.log(response);
  }else{
  	console.log(error);
  }
}





