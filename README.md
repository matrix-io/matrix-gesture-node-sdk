# Matrix Gesture Node SDK
![alt text](https://github.com/matrix-io/matrix-gesture-node-sdk/raw/master/examples/logo.png "Gesture.ai Logo")

A high performance C++ library with node bindings to easily incorporate gesture recognition into any project. It uses a trained object detection method (with over 100,000 samples per gesture!) and is therefore robust to different skin colors and lighting changes. 

For the initial release the SDK is only linux compatible, but it can be extended to other systems via Docker and a WebSocket.

There are currently three detectable gestures: open PALM, THUMB UP, and FIST. Tracking options are available so it can track changes between hands. Smoothing filters are available so fine control can be used.

![alt text](https://github.com/matrix-io/matrix-gesture-node-sdk/raw/master/examples/palm.jpg "Palm")
![alt text](https://github.com/matrix-io/matrix-gesture-node-sdk/raw/master/examples/fist.jpg "Fist")
![alt text](https://github.com/matrix-io/matrix-gesture-node-sdk/raw/master/examples/thumb_up.jpg "Thumb Up")

### Dependences:
Linux, 
OpenCV 3.1.0, 
Node 0.12+, 
JSON

## Examples (with Docker)

As it is currently only linux compatible we have created an image on DockerHub which includes all required dependencies. If you would like to build the Dockerfile yourself it is included in the repository.

* First give root access to Docker as an X server. This will allow the camera feed to be accessed.

```xhost local:root```

* Download the image and create and run a daemon container, giving it access to your default camera and a port through which to host a webserver. 

```sudo docker run -itd -p 8080:8080 -p 3000:3000 --privileged \
-name gesture \
-v /dev/video0:/dev/video0 \
-v /tmp/.X11-unix:/tmp/.X11-unix \
-e DISPLAY=$DISPLAY admobilize/gesture```

* Execute a command inside the docker, to run the node sample `handTracker.js`

```sudo docker exec -it gesture /bin/sh -c 'cd ~/matrix-gesture-node-sdk/; examples/handTracker.js'```

 This pops up a window with the feed from your default camera and runs the tracking algorithm looking for and boxing whenever it detects a flat palm. It will also look for a thumbs up or a closed fist if the palm briefly disappears. Try out some of the examples or write your own using the documentation!

It will return a `JSON` object with the location (both center (xc,yc) and top left corner (x,y)), size, hand type, and unique id.

```{
  "results":
    [{
        "hand_type":0,
        "height":184,
        "id":5,
        "width":184,
        "x":181,
        "xc":273,
        "y":196,
        "yc":288
      }]
}```

For those running mac/windows, you would have to create a VirtualBox running linux to be able to access the camera from docker. Docker-engine runs a basic linux that doesn't recognize the camera. Docker is currently beta testing their new mac/windows docker which will be compatible with this library and you will be able to access your camera. Alternatively you can run detection through a node server in the node SDK where you can access it through `localhost:3000` in a browser. 

```sudo docker exec -it gesture /bin/sh -c 'cd ~/matrix-gesture-node-sdk/; npm run start-test-server'```

(We have had some permission problems with google chrome and safari blocking the server on mac, but firefox works fine)

### Using without Docker

As long as you have the required dependencies enter the node sdk directory and run:

```npm install && npm run setup```

or if you are root

```npm install && npm run-root-setup```

Run some examples! 

`node examples/handTracker.js` or `npm run start-test-server`

### Documentation
The documentation can be found [here](http://gesture.ai/#/develop "Gesture.ai Documentation")

### Community
Visit and join our community [here](http://community.gesture.ai "Gesture.ai Community")
