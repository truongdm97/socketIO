var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var userId = 0;
io.on('connection', function(socket){
  socket.userId = userId ++;

  socket.on('chat', function(msg){
    io.emit('chat', {
      id: socket.userId,
      msg: msg
    });
  });
});

http.listen(process.env.PORT || 80);