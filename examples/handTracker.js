var Gesture = require('../lib/gesture');
var gesture = new Gesture.detector(0);


//setup detection options
gesture.setTimeToCountDetection(.3);
gesture.setDraw(true);
gesture.setShow(true);
gesture.setFrameFlip(true);


gesture.detectTrackStream([Gesture.PALM, Gesture.THUMB_UP, Gesture.FIST]);


//events
gesture.on('error', console.log);
gesture.on('frame', console.log);
gesture.on('stop',  function(){
	console.log("Detection process was stopped");
});

  
//do something when app is closing
process.once('exit', onClose);

//catches ctrl+c event
process.once('SIGINT', onClose);

//catches uncaught exceptions
process.once('uncaughtException', function(error){
  console.log(error.stack);
	onClose();
});



function onClose(){
	console.log("Exit program");
  gesture.stop();
  process.exit(0);

}     