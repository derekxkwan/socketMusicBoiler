//webaudioapi stuff on the client

var context, masterGain, sinGain, sinOsc, intervalFunc, buf, bufDur, buf2, buf2Dur, noiseBuf, noiseOsc, noiseGain, filter;
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
			console.log(bufDur);
			}, function(e){"Error with decoding audio data" + e.err});

		}
	req.send();
};

var buf2Init = function(){
	var req = new XMLHttpRequest();
	req.open('GET', 'media/buf2.wav', true);
	req.responseType = 'arraybuffer';

	//decode async
	req.onload = function(){
		context.decodeAudioData(req.response, function(buffer) {
			buf2 = buffer;
			buf2Dur = buffer.duration;
			console.log(buf2Dur);
			}, function(e){"Error with decoding audio data" + e.err});

		}
	req.send();
};


var noiseInit = function(){
	//filling noiseBuf
	var bufferSize = 2 * context.sampleRate;
	noiseBuf = context.createBuffer(1, bufferSize, context.sampleRate);
	var output = noiseBuf.getChannelData(0);
	for(var i=0; i<bufferSize; i++){
		output[i] = Math.random()*2-1;
	};
	//noiseOsc init
	noiseOsc = context.createBufferSource();
	noiseOsc.buffer = noiseBuf;
	noiseOsc.loop = true;
	noiseOsc.start(0);
	noiseGain = context.createGain();
	noiseGain.gain.value = 0;
	//filter init
	filter = context.createBiquadFilter();
	filter.type = 2;
	filter.Q.value = 3;
	filter.frequency.value = 440;
	//making the connections
	noiseOsc.connect(filter);
	filter.connect(noiseGain);
	noiseGain.connect(masterGain);
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

var setGrainTimes = function(numGrains,grainDur){
	var timeArray = [0];
		for(var i=1; i<numGrains-1; i++){
			var newTime = parseInt(Math.random()*50)/50.0*grainDur;
				while(timeArray.indexOf(newTime) >=0){
			newTime = parseInt(Math.random()*50)/50.0*grainDur;
			
				};
						timeArray.push(newTime);
				
		};
		timeArray.push(grainDur);
		return timeArray.sort();
	};


function bufPlayer(srcBuf){
	var delayStart = 0;
	var att = 0.0001;
	var dec = 0.0001;
	var numGrains = parseInt(Math.random()*10+15);
	var grainDur = Math.random()*2+1;
	var grainTimes = setGrainTimes(numGrains,grainDur);
	//console.log(grainDur);
	//console.log(grainTimes);
	for(var i=0; i<grainTimes.length-1;i++){

		var thisDur = grainTimes[i+1]-grainTimes[i];
		//console.log(thisDur);
		var lim = grainTimes.length -2;
		setTimeout(function(grainTimes){var source = context.createBufferSource();
			var srcDur;
			switch(srcBuf){
				case 0:
					console.log("buf");
					source.buffer = buf;
					srcDur = bufDur;
					break;
				case 1:
					console.log("buf2");
					source.buffer = buf2;
					srcDur = buf2Dur;
				};
			var grainGain = context.createGain();
			source.connect(grainGain);
			grainGain.connect(context.destination);
			var offsetVal = Math.random()*srcDur;
			if(offsetVal +thisDur > srcDur){ offsetVal = srcDur-thisDur };
			var gainVal = Math.random() * 0.25 + 0.75;
			var now = context.currentTime;
	
			if(i == 0){
				grainGain.gain.setValueAtTime(0.0, now);
				grainGain.gain.setTargetAtTime(gainArray[0], now, att);
				}
			else if(i == lim){
				grainGain.gain.setTargetAtTime(0.0, now+(thisDur)-dec, dec);
		
				}
			else {
			grainGain.gain.setValueAtTime(gainVal, now);
			};

			source.start(now, offsetVal, thisDur);


		}	, grainTimes[i]*1000);
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
