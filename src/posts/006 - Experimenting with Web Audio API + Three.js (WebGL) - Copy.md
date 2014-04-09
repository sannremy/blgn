<!--
  tags: Web Audio, WebGL, JavaScript
  category: Experiments
  title: Experimenting with Web Audio API + Three.js (WebGL)
  date: 2013-05-09
-->

Here is a post about my experiment of Web Audio API. Throughout this article, I will show how I made the sound visualizer in WebGL.

![Terrain generation: the diamond-square algorithm and Three.js](images/posts/experimenting-with-web-audio-api-three-js-webgl/visualizer-1.png "Terrain generation: the diamond-square algorithm and Three.js")

<p class="center"><a href="/apps/sound-visualizer-web-audio-api-webgl/" class="button link">View live demo</a></p>

Now, let's see how we load the music and make the cube moving. As usual, you can find [all the source code](https://github.com/srchea/Sound-Visualizer/ "Sound Visualizer source code") on [my github account](https://github.com/srchea/ "GitHub account").

<ol class="summary"><li><a href="#web-audio-api-part-load-the-music-and-get-the-frequency-data">Web Audio API part: Load the music and get the frequency data</a></li><li><a href="#webgl-part-make-the-cubes-react-regarding-the-sound">WebGL part: Make the cubes react regarding the sound</a></li><li><a href="#useful-links-and-free-resources">Useful links and free resources</a></li></ol>

Web Audio API part: Load the music and get the frequency data
-------------------------------------------------------------

The main object of the Web Audio API is the AudioContext object. At the time that I'm writing that post, only Google Chrome and Firefox Nightly are supporting the AudioContext. Note that the class name is prefixed by webkit for Chrome.

<pre><code class="language-javascript">try {
	if(typeof webkitAudioContext === 'function') { // webkit-based
		context = new webkitAudioContext();
	}
	else { // other browsers that support AudioContext
		context = new AudioContext();
	}
}
catch(e) {
	// Web Audio API is not supported in this browser
	alert("Web Audio API is not supported in this browser");
}</code></pre>

To load the file, we need to use a response type specified in the XMLHttpRequest level 2: ArrayBuffer.

<pre><code class="language-javascript">var request = new XMLHttpRequest();
request.open("GET", url, true);
request.responseType = "arraybuffer";
 
request.onload = function() {
	// decode audio data
}</code></pre>

The W3C advises us on using this method instead of createBuffer method because "it is asynchronous and does not block the main JavaScript thread". After that, we need to decode the array buffer with the `decodeAudioData()` method.

<pre><code class="language-javascript">AudioContext.decodeAudioData(audioData, successCallback, errorCallback);</code></pre>

Then we need to create AudioNode objects for various things:

  * `ScriptProcessorNode`, created with the `AudioContext.createJavaScriptNode(bufferSize)`, it handles on how many the `onaudioprocess` event is dispatched. The `bufferSize` must take these values: 256, 512, 1024, 2048, 4096, 8192, 16384.
  * `AnalyserNode`, created with `AudioContext.createAnalyser()`, it provides real-time frequency and time-domain analysis information.
  * `AudioBufferSourceNode`, created with `AudioContext.createBufferSource()`, that is for the playback.

After creating these nodes, we need to connect them. The node source is connected to the analyser node which is connected to the script processor node. The main node is connected to the destination, that is to say the sound card.

<pre><code class="language-javascript">AudioBufferSourceNode.connect(AnalyserNode);
AnalyserNode.connect(ScriptProcessorNode);
AudioBufferSourceNode.connect(AudioContext.destination);</code></pre>

Now, we are getting the binaries from frequencies at the current time and copy the data into unsigned byte array. We will use the array to scale the cubes regarding the values.

<pre><code class="language-javascript">ScriptProcessorNode.onaudioprocess = function(e) {
    array = new Uint8Array(AnalyserNode.frequencyBinCount);
    AnalyserNode.getByteFrequencyData(array);
};</code></pre>

**If the audio process event stops during the playback, it is because the event is defined in a function. To fix it, you need to bind to the window object (make it global). Actually, the garbage collector is called and it cleaned the variable. Here is the thread about that issue.**

To start playing the music, we are using the `noteOn()` method.

<pre><code class="language-javascript">AudioBufferSourceNode.noteOn(0);</code></pre>

Here is the full source code explained above:

<pre><code class="language-javascript">var context;
var source, sourceJs;
var analyser;
var buffer;
var url = 'my_music.ogg';
var array = new Array();

var request = new XMLHttpRequest();
request.open('GET', url, true);
request.responseType = "arraybuffer";

request.onload = function() {
	context.decodeAudioData(
		request.response,
		function(buffer) {
			if(!buffer) {
				// Error decoding file data
				return;
			}

			sourceJs = context.createJavaScriptNode(2048);
			sourceJs.buffer = buffer;
			sourceJs.connect(context.destination);
			analyser = context.createAnalyser();
			analyser.smoothingTimeConstant = 0.6;
			analyser.fftSize = 512;

			source = context.createBufferSource();
			source.buffer = buffer;

			source.connect(analyser);
			analyser.connect(sourceJs);
			source.connect(context.destination);

			sourceJs.onaudioprocess = function(e) {
				array = new Uint8Array(analyser.frequencyBinCount);
				analyser.getByteFrequencyData(array);
			};

			source.noteOn(0);
		},

		function(error) {
			// Decoding error
		}
	);
};</code></pre>

WebGL part: Make the cubes react regarding the sound
----------------------------------------------------

First of all, we create the scene and the cubes into it.

<pre><code class="language-javascript">var scene = new THREE.Scene();
var cubes = new Array();

var i = 0;
for(var x = 0; x &lt; 30; x += 2) {
	var j = 0;
	cubes[i] = new Array();
	for(var y = 0; y &lt; 30; y += 2) {
		var geometry = new THREE.CubeGeometry(1.5, 1.5, 1.5);

		var material = new THREE.MeshPhongMaterial({
		color: randomFairColor(),
		ambient: 0x808080,
		specular: 0xffffff,
		shininess: 20,
		reflectivity: 5.5 
		});

		cubes[i][j] = new THREE.Mesh(geometry, material);
		cubes[i][j].position = new THREE.Vector3(x, y, 0);

		scene.add(cubes[i][j]);
		j++;
	}
	i++;
}</code></pre>

Then, we are going to rescale 225 cubes on the z axis. This code goes in a function called by `requestAnimationFrame()`. Note that array is build from the `audioprocess` event and contains the bytes of frequencies.

<pre><code class="language-javascript">var k = 0;
for(var i = 0; i &lt; cubes.length; i++) {
	for(var j = 0; j &lt; cubes[i].length; j++) {
		var scale = array[k] / 30;
		cubes[i][j].scale.z = (scale &lt; 1 ? 1 : scale);
		k += (k &lt; array.length ? 1 : 0);
	}
}</code></pre>

You can find the full source code here and the whole applications here.

Useful links and free resources
-------------------------------

  * [W3C's Web Audio API specifications](https://dvcs.w3.org/hg/audio/raw-file/tip/webaudio/specification.html "W3C's Web Audio API specifications")
  * [Exploring the HTML5 Web Audio: visualizing sound](http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound "Exploring the HTML5 Web Audio: visualizing sound")
  * [Getting Started with Web Audio API](http://www.html5rocks.com/en/tutorials/webaudio/intro/ "Getting Started with Web Audio API")
  * [Looperman (free music resources)](http://www.looperman.com/tracks "Looperman (free music resources)")
  * [Source code from GitHub](https://github.com/srchea/Sound-Visualizer "Source code from GitHub")