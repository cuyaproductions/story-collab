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

io.on('connection', (socket) => {
  console.log('New author connected.');
  authors.push(this);

    socket.on('add message', (data) => {
      console.log(`New message from ${authors.indexOf(this)}: ${data.message}`);
      messages.push(data.message);
      // emit message to other users
      socket.emit('new message', data);
      // send to Firebase to store
    });
});

server.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}/`);
});

