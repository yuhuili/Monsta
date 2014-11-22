Monsta - Captcha using CreateJS and Canvas
======
Copyright 2014 Ayogo Health Inc.

Intro
======
Monsta is a client-side captcha based on CreateJS and Canvas. The user has to drag the monster and let it eat all coins, but not the bomb.

Standalone vs Object
======
####Standalone:
(demo only) a single webpage with Monsta defined in a js file, but not as an object.

####Object:
A webpage can initialize the Monsta object and define a callback method.

Setup
======
####Standalone:
Open monsta.html inside Standalone Page.

####Object:
(use it on a web page)

1. Inside ```<head>``` tag, include the following stylesheet and script links.
  ```
  <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
  <link href='//fonts.googleapis.com/css?family=Fjalla+One' rel='stylesheet' type='text/css'>
  <link href="css/cac.css" rel='stylesheet' type='text/css'/>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
  <script src="//code.createjs.com/createjs-2013.12.12.min.js"></script>
  ```

2. Define Monsta variable and initialize it, define the callback method if necessary.
  ``` 
  Monsta("CANVAS_ID","VARIABLE_NAME")
  ```
  
  ```
  <script>
    var captcha;
    function init() {
      captcha = new Monsta("myCanvas", "captcha");
      captcha.onSuccess = methodToBeCalled;
    }
  </script>
  ```
  *```myCanvas``` is the id of the canvas, while captcha is the name of the variable you are assigning to. Make sure to define the variable outside of the scope of init. (globally defined)*

3. Navigate to ```<body>``` tag, add a method to be called onload so that the captcha would be loaded automatically.
  ```<body onload="init()">```

4. Then, navigate to the place where the captcha would be dipalyed, put the following block.
  ```
  <div style="position:relative">
  	<canvas id="myCanvas" width="400" height="250">
      No Canvas
    </canvas>
  </div>
  ```
  *```myCanvas``` is the same parameter defined earlier in the script.*
