//____________________________________BEGIN setup
var path = require('path');
var http = require('http');
var express = require('express'),
    app = express(),
    server = require("http").createServer(app),
    io = require("socket.io").listen(server);

app.use(express.static(path.join(__dirname, 'public')))


app.get("/", function(req, res) {
    res.sendFile("index.html")
})

io.sockets.on("connection", function(socket) {
    socket.on("server", function(data) {

        io.sockets.emit('client', data)
    })
})

server.listen(3000);