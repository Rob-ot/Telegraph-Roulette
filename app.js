var express = require('express')
var app = express()
var server = require('http').createServer(app)
var io = require('socket.io').listen(server)

var waitingUser

server.listen(3005)

app.use(express.static(__dirname + '/public'))

app.get('/', function (req, res) {
  res.sendfile(__dirname + '/public/index.html')
})

io.sockets.on('connection', function (socket) {
  console.log('socket connected')
  if (!waitingUser) {
    socket.emit('waiting')
    console.log('no one waiting, making someone wait')
    waitingUser = socket
  }
  else {
    console.log('connecting the two users')
    connectUsers(socket, waitingUser)
    connectUsers(waitingUser, socket)
    waitingUser = undefined
  }
})

function connectUsers(user1, user2) {
  user1.emit('matched')
  user1.set('partner', user2)
  user1.on('message', function(data) {
    console.log('sending data from user1 to user2', data)
    user2.emit('message', data)
  })
}
