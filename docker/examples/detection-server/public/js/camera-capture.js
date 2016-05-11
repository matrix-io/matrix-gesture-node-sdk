 
'use strict';
window.onload  = function(argument){


	var video = document.querySelector('video');
	var canvas = document.querySelector('canvas');
	var ctx = canvas.getContext('2d');
	var localMediaStream = null;
	var socket = io();
  var resultsContent =  document.getElementById('results');

	socket.on('detection', function(results){
	  console.log('client,results:', results);
	  $('.box').remove();
	  for(var i = 0; i < results.length; i++) {
	  	 $('body').append('<div id="box-'+results[i].id+'" class="box"></div>');
	  	 $('#box-'+results[i].id).css({
	  		'top': results[i].y+'px', 
	  		'height': results[i].height+'px', 
	  		'width': results[i].width+'px', 	  		
	  		'left': results[i].x+'px'}
	  		)

	  }
	  var boxHeight = (results[0].yc)/4.8;
	  player.setVolume(boxHeight);
	  setTimeout(function() {
	    var videoLength = player.getDuration();
	    if(results[0].hand_type === 1) {
	      var handSeek = player.getCurrentTime() + results[0].xc;
	      player.seekTo(handSeek, true);
	    }
          }, 1000);


	  //var para = document.createElement("P");                       // Create a <p> node
	  //var t = document.createTextNode(JSON.stringify(results));      // Create a text node
	  //para.appendChild(t);                                          // Append the text to <p>
	  //resultsContent.appendChild(para);      
	});

	navigator.getUserMedia = navigator.getUserMedia ||
	navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
	var localMediaStream = null;
	var constraints = {
		audio: false,
		video: true
	};
	var video = document.querySelector('video');
	var dataURL;
	function successCallback(stream) {
  window.stream = stream; // stream available to console
  //record(stream);
  localMediaStream = stream;
  if (window.URL) {
  	video.src = window.URL.createObjectURL(stream);
   } else {
   	video.src = stream;
   }


   setInterval(snapshot, 20);
 }

 function errorCallback(error) {
 	console.log('navigator.getUserMedia error: ', error);
 }

 navigator.getUserMedia(constraints, successCallback, errorCallback);

 function snapshot(){
 	if (localMediaStream) {
 		ctx.drawImage(video, 0, 0);
 		dataURL = canvas.toDataURL('image/png');
 		socket.emit('frame', dataURL);
 	}
 }

 


}

// 2. This code loads the IFrame Player API code asynchronously.
      var tag = document.createElement('script');

      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      // 3. This function creates an <iframe> (and YouTube player)
      //    after the API code downloads.
      var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: 'M7lc1UVf-VE',
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
          }
        });
      }

      // 4. The API will call this function when the video player is ready.
      function onPlayerReady(event) {
        event.target.playVideo();
      }

      // 5. The API calls this function when the player's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the player should play for six seconds and then stop.
      var done = false;
      function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
          setTimeout(stopVideo, 6000);
          done = true;
        }
      }
      function stopVideo() {
        player.stopVideo();
      }

