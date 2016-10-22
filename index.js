//initialize firebase
var firebase = require("firebase");
var config = {
    apiKey: "AIzaSyCk147Q-MQKikvWVIOO4shXd8C0UKiBKpA",
    authDomain: "story-collab.firebaseapp.com",
    databaseURL: "https://story-collab.firebaseio.com",
    storageBucket: "story-collab.appspot.com",
    messagingSenderId: "814622369840"
  };

firebase.initializeApp(config);

const express = require('express');
const app = express();

const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');

const port = process.env.PORT || 3000;
var messageNumber = 0;
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
  const authorId = authors.length;
  authors.push(socket);
  console.log(`New author #${authorId} connected :)`);

    socket.on('add message', (data) => {
      console.log(`New message from #${authorId}: ${data.message}`);
      messages.push(data.message);
      // emit message to other users
      socket.emit('new message', data);
      // send to Firebase to store
      newMessage = {};
      newMessage[messageNumber] = data.message;
      firebase.database().ref('message/' + messageNumber).set({
        contents : data.message});
      messageNumber = messageNumber+1;
    });

    socket.on('disconnect', () => {
      console.log(`Author #${authorId} left :(`)
    });
});

server.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}/`);
});

