var Gesture = require('../lib/gesture');
var gesture = new Gesture.detector(0);


//setup detection options
gesture.setTimeToCountDetection(2);
gesture.setDraw(true);
gesture.setShow(true);
gesture.setFrameFlip(true);


gesture.runDetection(Gesture.PINCH);


//events
gesture.on('error', console.log);
gesture.on('frame', console.log);
gesture.on('stop',  function(){
	console.log("Detection process was stopped");
});


