var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

server.listen(3005)

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html');
});

io.sockets.on('connection', function (socket) {
  socket.on('message', function (message) {
    // echo
    socket.emit('message', message);
  });
});
