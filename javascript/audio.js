//webaudioapi stuff on the client

var context, masterGain, sinGain, sinOsc, intervalFunc, buf, bufDur;
var telegraphPlay = false;
function init(){
	if(!context){
	try {
		window.AudioContext = 
			window.AudioContext || window.webkitAudioContext;
		context = new AudioContext();
		}
	catch(e) {
		alert('Web Audio API is not supported in this browser');
	}
	masterInit();
	sinInit();

	}

};


var masterInit = function(){
	masterGain = context.createGain();
	masterGain.gain.value = 0;
	masterGain.connect(context.destination);



	};
var sinInit = function(){

	//sinOsc init
	sinOsc = context.createOscillator();
	sinGain = context.createGain();
	sinOsc.type = "sine";
	sinOsc.frequency.value = Math.random()*5000+500;
	sinGain.gain.value = 0;
	sinOsc.start(0);
	//making the connecsquares
	sinOsc.connect(sinGain);
	sinGain.connect(masterGain);


};

var bufInit = function(){
	var req = new XMLHttpRequest();
	req.open('GET', 'media/buf.wav', true);
	req.responseType = 'arraybuffer';

	//decode async
	req.onload = function(){
		context.decodeAudioData(req.response, function(buffer) {
			buf = buffer;
			bufDur = buffer.duration;
			console.log(espRadDur);
			}, function(e){"Error with decoding audio data" + e.err});

		}
	req.send();
};

var telegraph = function(barDur){
	var att = 0.001, dec = 0.05, barLen = 16;
	var noteLen = parseFloat(barDur)/parseFloat(barLen);
	var now = context.currentTime;
	telegraphPlay = false;
	sinGain.gain.cancelScheduledValues(now);
	teleTimeout = setTimeout(function(){telegraphPlay = true;}, barDur*1000);
	for (var i=0; i<barLen; i++){
	var randInt = parseInt(Math.random()+0.5);
			sinGain.gain.setTargetAtTime(randInt, now+(i*noteLen), att);
			sinGain.gain.setTargetAtTime(0.0, now+((i+1)*noteLen)-dec, dec);
	}
};

var beginPiece = function(){
	masterGain.gain.value = 1;
	intervalFunc = setInterval(function(){

	 if(telegraphPlay){

	    telegraph(barDur);

	  };


	};



var endPiece = function(){
  masterGain.gain.value = 0;
  telegraphPlay = false;
  
};
