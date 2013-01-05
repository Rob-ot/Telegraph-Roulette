var isConnected = false
var messageStartTime = null
var messageQueue = async.queue(handleQueueItem, 1)

var rockerButton = document.querySelector("#telegraph")
var messageDisplay = document.querySelector(".messageDisplay")

var socket = io.connect("")

socket.on('waiting', function() {
  document.getElementById('status').innerHTML = 'waiting'
})

socket.on('matched', function() {
  document.getElementById('status').innerHTML = 'matched'
})

socket.on("message", function (message) {
  console.log("Received", message)
  messageQueue.push(message)
  messageQueue.push({ blank: true })
})

socket.on("connect", function () {
  console.log("Socket Connected!")
  isConnected = true
})


function startMessage (e) {
  messageStartTime = Date.now()

  window.addEventListener("mouseup", endMessage, false)
  window.addEventListener("touchend", endMessage, false)
}

function endMessage () {
  var message = {
    duration: Date.now() - messageStartTime
  }
  socket.emit("message", message)
  console.log("Sending", message)

  window.removeEventListener("mouseup", endMessage, false)
  window.removeEventListener("touchend", endMessage, false)
}


function handleQueueItem (message, cb) {
  // blank messages are just for a delay
  if (message.blank) {
    setTimeout(function () {
      cb()
    }, 250)
    return
  }

  messageDisplay.classList.add("messaging")

  setTimeout(function () {
    messageDisplay.classList.remove("messaging")
    cb()
  }, message.duration)

}

rockerButton.addEventListener("mousedown", startMessage, false)
rockerButton.addEventListener("touchstart", startMessage, false)

