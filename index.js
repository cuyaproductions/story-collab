const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const port = process.env.PORT || 3000;

// Set up static files directory
app.use('/public', express.static(path.join(__dirname, 'client/public')));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, 'client/index.html'));
});

app.get('/favicon.ico', (request, response) => {
  response.sendStatus(200)
    .end();
});

// Always send the index.html
app.get('*', (request, response) => {
  response.redirect('/');
});

const messages = [];
const authors = [];
let areTyping = 0;

io.on('connection', (socket) => {
  const authorId = authors.length;
  authors.push(socket);
  console.log(`New author #${authorId} connected :)`);

  // Disconnect event
  socket.on('disconnect', () => {
    console.log(`Author #${authorId} left :(`)
  });

  // When this socket adds a new message
  socket.on('add message', (data) => {
    console.log(`New message from #${authorId}: ${data.message}`);
    messages.push(data.message);
    // Broadcast new message to all other sockets
    socket.broadcast.emit('new message', data);
    // send to Firebase to store
  });

  // Notify all authors that this author is typing
  socket.on('start typing', () => {
    console.log(`Author #${authorId} is typing.`);
    socket.broadcast.emit('other typing', ++areTyping);
  });

  // Notify all authors that this author stopped typing
  socket.on('stop typing', () => {
    console.log(`Author #${authorId} stopped typing.`);
    socket.broadcast.emit('other typing', --areTyping);
  });
});

server.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}/`);
});

