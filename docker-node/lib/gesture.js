var events = require("events");
var util = require("util");
var binary = require('node-pre-gyp');
var path = require('path');


var binding_path = binary.find(path.resolve(path.join(__dirname,'..','package.json')));
var binding = require(binding_path);

var GestureRecognition = binding.GestureRecognition;
var processRunning = false;
var stopProcess = false;
var self;
var Gesture = function(camera) {
  self = this;
  if(typeof camera !== "undefined"){
    this.gestureRecognition = new GestureRecognition(camera);
  }else{
    this.gestureRecognition = new GestureRecognition();
  }

};


util.inherits(Gesture, events.EventEmitter);



Gesture.prototype.detectStream = function(type){
  processRunning = true;
  self.detect(type, function(error, response){
    if(error){
     self.emit('error', error);
     processRunning = false;
     self.emit('stop');
   }else{
     self.emit('frame', response);
     if(!stopProcess){
       self.detectStream(type);
     }else{
       stopProcess = true;
       processRunning = false;
       self.emit('stop');
     }
   }  
 });   
}



Gesture.prototype.detectTrackStream = function(types) {
  processRunning = true;
  this.gestureRecognition.trackingDetect(types, function(error, response){
    if(error){
     self.emit('error', error);
     processRunning = false;
     self.emit('stop');
   }else{
     self.emit('frame', response);
     if(!stopProcess){
      self.detectTrackStream(types);
    }else{
      stopProcess = false;
      processRunning = false;
      self.emit('stop');
    }

  }
});   
}



Gesture.prototype.detect = function(buffer, type, callback) {

  if(typeof (type) == 'function'){
   callback = type;
   type = buffer;
   this.gestureRecognition.detect(type, function(error, response){
     var response = JSON.parse(response);
    if(response.results){
     self.emit('detection', response.results)
   }
   callback(error, response);
 });
   
 }else{

  this.gestureRecognition.detect(buffer, type, function(error, response){
   var response = JSON.parse(response);
    if(response.results){
     self.emit('detection', response.results)
   }
   callback(error, response);
 });
} 

}


Gesture.prototype.detectTrack = function(buffer, types, callback) {


  if(typeof types === "function"){
    callback = types;
    types  = buffer;
    this.gestureRecognition.trackingDetect(types, function(error, response){
        var response = JSON.parse(response);
      if(response.results){
       self.emit('detection', response.results)
     }
     callback(error, response);
   });
  }else{
    this.gestureRecognition.trackingDetect(buffer, types, function(error, response){
    var response = JSON.parse(response);
      if(response.results){
       self.emit('detection', response.results)
     }
     callback(error, response);
   });
  } 

}


Gesture.prototype.stop = function(){
	if(processRunning){
   stopProcess = true;
   self.stopVideoCapture();
 }
}



Gesture.prototype.setTimeToCountDetection = function(time) {
 this.gestureRecognition.setTimeToCountDetection(time);
}


Gesture.prototype.setTimeToDiscardDetection = function(time) {
 this.gestureRecognition.setTimeToDiscardDetection(time);
}


Gesture.prototype.setOneHand = function(oneHand) {
 this.gestureRecognition.setOneHand(oneHand);
}


Gesture.prototype.setDraw = function(draw) {
 this.gestureRecognition.setDraw(draw);
}


Gesture.prototype.setShow = function(show) {
 this.gestureRecognition.setShow(show);
}



Gesture.prototype.setFrameFlip = function(frameFlip) {
 this.gestureRecognition.setFrameFlip(frameFlip);
}


Gesture.prototype.setKalman = function(kalman) {
 this.gestureRecognition.setKalman(kalman);
}


Gesture.prototype.detectionQuality = function(detectionQuality) {
 this.gestureRecognition.detectionQuality(detectionQuality);
}



Gesture.prototype.stopVideoCapture = function() {
 this.gestureRecognition.stopVideoCapture();
}


module.exports = {
	PALM : 0,
	FIST : 1,
	THUMB_UP : 2,
	detector: Gesture
};
