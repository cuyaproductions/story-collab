// const socket = io(location.href);
//initialize firebase
var firebase = require("firebase");

const story = document.getElementById('story');
const form = document.getElementById('input-form');
const messageInput = document.getElementById('input-text');

function addMessage(message) {
  const messageElement = document.createElement('span');

  messageElement.classList.add('story__message');
  messageElement.textContent = message.trim() + ' ';

  story.appendChild(messageElement);
}

function formSubmitHandler(event) {
  event.preventDefault();

  // socket.emit('add message', {message: messageInput.value});
  addMessage(messageInput.value);
  messageInput.value = '';
}

function newMessageHander(message) {
  addMessage(message);
}

function init() {
  form.addEventListener('submit', formSubmitHandler);
  // socket.on('new message', newMessageHander);
}

init();