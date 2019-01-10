var express = require('express');
var app = express();
var http = require('http').Server(app);
// var io = require('socket.io')(http);

var Gesture = require('../../lib/gesture');
var gesture = new Gesture.detector();

// Certificate
const fs = require('fs');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/ai.bzcentre.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/ai.bzcentre.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/ai.bzcentre.com/fullchain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const https = require('https').Server(credentials, app);
var io = require('socket.io')(https);

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



https.listen(3000, function(){
  console.log('listening on *:3000');
});



function detectGesture(imageBase64){
	var imageBase64 = imageBase64.replace('data:image/png;base64,','');
	var bufferImage = new Buffer(imageBase64, 'base64');
	gesture.detectTrack(bufferImage, [Gesture.PALM, Gesture.THUMB_UP, Gesture.FIST],  function(){});

}






