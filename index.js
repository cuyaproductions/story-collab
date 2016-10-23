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
// firebase.database().ref('Storys/One/Total').once('value').then(function(snapshot){
//   messageNumber = snapshot.val();
//   if(messageNumber == null){
//     messageNumber = 0;
//   }

// });
const authors = [];
var messages = [];


let areTyping = 0;
var titles = [];
var uniqueIDs = [];
var uniqueStories = [];
var storyNumber = 0;
var currentStoryID = 0;
var messageNumber = 0;

//Gets an object array filled with the unique stories. 
function getUniqueStories(){
  firebase.database().ref('Storys/').once('value').then(function(snapshot){
    var storys = snapshot.val();
    storyNumber =(Object.keys(storys).length); //updates the global containing the number of different stories
    uniqueStories = Object.keys(storys).map(function(key) {
       return storys[key];
      });
    });  
}
getUniqueStories();
// Set view engine to EJS and locate views
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

// Set up static files directory
app.use('/public', express.static(path.join(__dirname, 'client/public')));

app.get('/', (request, response) => {
  response.render('index', {stories: uniqueStories});
});

app.get('/story', (request, response) => {
  //generates a new unique story ID key and redirects to that page
  currentStoryID = guidGenerator();
  response.redirect(`/story/${currentStoryID}`);
  response.redirect(request.get('referer'));
});

app.get('/story/:id', (request, response) => {
  currentStoryID = request.params.id;
  //Read Messages From Current Story
  console.log('StoryID in readMessagesFromStory: '+currentStoryID);
  firebase.database().ref('message/'+currentStoryID).once('value').then(function(snapshot){
    var pastStory = snapshot.val();
    messages = [];
      for(var i = pastStory.length - 1; i >= 0; i--) {
        messages[i] = pastStory[i].contents
      };
    //messages.push(pastStory.contents);
    console.log('Messages array:' + messages);
    });
  response.render('story', {messages: messages});
  response.redirect(request.get('/story/:id'));
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
  const authorId = authors.length;
  authors.push(socket);
  console.log(`New author #${authorId} connected :D`);

  // Disconnect event
  socket.on('disconnect', () => {
    console.log(`Author #${authorId} left :(`)
  });

  // When this socket adds a new message
  socket.on('add message', (data) => {
    firebase.database().ref('message/'+currentStoryID).once('value').then(function(snapshot){
      var messageJson = snapshot.val();
      messageNumber =(Object.keys(messageJson).length);
      });
    console.log(`New message from #${authorId}: ${data.message}`);
    // console.log('data.message:' + data.message);
    //messages.push(data.message);
    console.log('message array:' + messages);
    // Broadcast new message to all other sockets
    socket.broadcast.emit('new message', data);
    // send to Firebase to store
    writeMessageContent(messages, data.message, authorId, currentStoryID, messageNumber);
  });

  // Notify all authors that this author is typing
  socket.on('start typing', () => {
    console.log(`Author #${authorId} is typing.`);
    socket.emit('other typing', ++areTyping);
  });

  // Notify all authors that this author stopped typing
  socket.on('stop typing', () => {
    console.log(`Author #${authorId} stopped typing.`);
    if (areTyping!=0){
    socket.emit('other typing', --areTyping);
  }
  });
});

server.listen(port, () => {
  console.log(`Listening on port http://localhost:${port}/`);
});

function writeMessageContent(messages, message, authorId, currentStoryID, messageNumber){
    //updates the message array
    messages.push(message);
    var date = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
    //writes the message data to the firebase database
      firebase.database().ref('message/'+currentStoryID+'/'+ messageNumber).set({
      author: authorId,
      contents : message,
      timestamp: date,
      upvote : 0,
      downvote: 0});
      //if this is the first message to hit the firebase database it creates the "Story"
      if(messageNumber == 0){
        firebase.database().ref('Storys/'+currentStoryID).set({
          authors: authorId,
          Title : message,
          timestamp: date,
          id: currentStoryID
        });
        getUniqueStories();

      }
      //updates the total number of messages for that specific story
      firebase.database().ref('Storys/'+currentStoryID).update({
        Total: messageNumber+1
      });
}

function readMessagesFromStory(currentStoryID, messages){
  console.log('StoryID in readMessagesFromStory: '+currentStoryID);
  firebase.database().ref('message/'+currentStoryID).once('value').then(function(snapshot){
    var pastStory = snapshot.val();
    // console.log('Past Story Object:' + pastStory);
    // console.log('Past Story Length:' + pastStory.length);
    messages = [];
      for(var i = pastStory.length - 1; i >= 0; i--) {
        messages[i] = pastStory[i].contents
      };
    //messages.push(pastStory.contents);
    console.log('Messages array:' + messages);
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
function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return S4();
}

