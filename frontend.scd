//supercollider on server computer to trigger socket.io broadcasts
s.boot;
b = NetAddr("127.0.0.1", 33333);

(
OSCdef(\receiveClients, { arg msg, time, addr, recvPort;
	//[msg, time, addr, recvPort].postln;
	~clients = msg[1..]; ~clients.postln;}, 'clients', recvPort: 11111);

)
	OSCdef(\receiveClients).enable;
	
Tdef(\section1, {

  var clients;
  var startStuff = 10+20.0.rand;
  var numClients = 3;
  var sendInterval = 10;
  var addClientInterval = 8;
  b.sendMsg("/startEnd", 1);
  inf.do({|sec1Ct|
    if(sec1Ct > startStuff, {
      if(sec1Ct % addClientInterval == 0 && (numClients <= (~clients.size)), {numClients = numClients + 1; numClients.postln;},{});
      if(sec1Ct % sendInterval == 0, {
	      numClients.do({|clientIdx|
	        var bufSelect = 1.5.rand.floor;
	        b.sendMsg("/radPlayer", ~clients[clientIdx], bufSelect);
			});   },{});
	},{});

    1.0.wait;
  });
});

Tdef(\section1).play;
