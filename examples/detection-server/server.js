var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var Gesture = require('../../lib/gesture');
var gesture = new Gesture.detector();
var isProcessing = false;
gesture.setTimeToCountDetection(.3);
gesture.setDraw(false);
gesture.setShow(false);
gesture.setKalman(false);
gesture.setFrameFlip(true);

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
 });

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('frame', detectGesture);
  gesture.on('detection', function(results){
    io.emit('detection', results);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

function detectGesture(imageBase64){
	var imageBase64 = imageBase64.replace('data:image/png;base64,','');
	var bufferImage = new Buffer(imageBase64, 'base64');
	if(isProcessing === false) {
		isProcessing = true;
		gesture.detectTrack(bufferImage, [Gesture.PALM, Gesture.THUMB_UP, Gesture.FIST],  function(){
			isProcessing = false;
		});
	}

}






