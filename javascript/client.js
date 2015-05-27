//parsing socket broadcasts on the client

var socket = io();

socket.on('telegraph', function(arg1){
  telegraph(arg1);


  });
  
  socket.on('beginEnd', function(yesNo){
    if(yesNo == 1){
      beginPiece();
      
    };
    if(yesNo == 0){
      endPiece();
    
    };
  });

socket.on('bufChopper', function(arg1){
  
  bufChopper(arg1);
  
});
