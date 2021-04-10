const express = require('express');
const app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var server = require("http").Server(app);
var io = require("socket.io")(server, {
  cors: {
    origin: '*'
  }
});

server.listen(process.env.PORT || 80);

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
