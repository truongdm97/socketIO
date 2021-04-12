const express = require('express');
const app = express();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
var server = require("http").Server(app);

var io = require('socket.io')({
	transports: ['websocket'],
});
io.attach(server);

server.listen(process.env.PORT);

io.on('connection', function(socket){

	console.log(socket.id);

	socket.on('beep', function(msg){
		io.emit('boop', msg);
	});
})
