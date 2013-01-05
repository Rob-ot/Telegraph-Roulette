var express = require('express')
var socketio = require('socket.io')
var server = express()
var io = socketio.listen(server)


server.use(express.static(__dirname + '/public'))

server.listen(3005)
