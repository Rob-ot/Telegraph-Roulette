var express = require('express')
var socketio = require('socket.io')
var server = express()
var io = socketio.listen(server)


server.use(express.static(__dirname + '/public'))

io.sockets.on('connection', function (socket) {
  socket.emit('test', { hurp: 'durp' })
})

server.listen(3005)
