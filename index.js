 "use strict";
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
//Loads in the Number of Past Messages on Current Story
var messageNumber = 0;
firebase.database().ref('Storys/One/Total').once('value').then(function(snapshot){
  messageNumber = snapshot.val();
  if(messageNumber == null){
    messageNumber = 0;
  }

});
const authors = [];
const messages = [];
const pastMessages =[];


let areTyping = 0;
var titles = [];
var uniqueIDs = [];

// Set view engine to EJS and locate views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Set up static files directory
app.use('/public', express.static(path.join(__dirname, 'client/public')));

app.get('/', (request, response) => {
  response.render('index', {messages: pastMessages});
  console.log(messages);
});

app.get('/favicon.ico', (request, response) => {
  response.sendStatus(200)
    .end();
});

// Always send the index.html
app.get('*', (request, response) => {
  response.redirect('/');
});

io.on('connection', (socket) => {
  // readUniqueIDs();
  writeUniqueID();
  readMessagesFromStory();
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
    writeMessageContent(messageNumber, data.message, authorId);
    messageNumber = messageNumber + 1;
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

function writeMessageContent(messageNumber, message, authorId){
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    firebase.database().ref('message/One/' + messageNumber).set({
    author: authorId,
    contents : message,
    timestamp: date,
    upvote : 0,
    downvote: 0});
    firebase.database().ref('Storys/One/').update({
    Total: messageNumber+1});
}

function readMessagesFromStory(){
  firebase.database().ref('message/One').once('value').then(function(snapshot){
    var pastStory = snapshot.val();
    for(var i = pastStory.length - 1; i >= 0; i--) {
      pastMessages[i] = pastStory[i].contents
    };
  });
}

function readUniqueIDs(){
  firebase.database().ref('UniqueTitleID/').once('value').then(function(snapshot){
    uniqueIDs = snapshot.val();
    firebase.database().ref('Storys/').once('value').then(function(snapshot){
    var frontPage = snapshot.val(); 
        titles[i] = uniqueIDs[1];
    }); 
  });
}

function writeUniqueID(){
  firebase.database().ref('Storys/').once('value').then(function(snapshot){
    var storys = snapshot.val();
    storyArray = Object.keys(storys);
    });  
}