const express = require('express');
const app = express();
app.use(express.json());
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);

// For the public route
app.use(express.static(__dirname + '/public'));
app.use(express.json());

//Middleware to parse the body for post requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routing
app.use('/api/account', require('./routes/account'));
app.use('/api/review', require('./routes/review'));

//Sockets
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('liked', (likes, liked) => {
    if (!liked) {
      likes++;
    } else {
      likes--;
    }
    io.emit('update', likes);
  });
});

// Running the server
const port = 8080;
server.listen(port, () => {
  console.log('Running on port: ' + port);
});
