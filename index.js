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

io.on('connection', (socket) => {
    socket.on('add message', (data) => {
      messages.push(data.message);
      // send to Firebase to store
    });
});

server.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}/`);
});

