'use strict';

var io = require('socket.io-client');

var socket = io('http://localhost:3001');

var testMessage = {
  'username': 'TestVasiliy',
  'content': 'Test'
};

var m = document.getElementById('m');
var f = document.getElementById('f');
var container = document.getElementById('messages');

f.onsubmit = function () {
  testMessage.content = m.value;
  socket.emit('message', testMessage);
  var li = document.createElement('li');
  li.textContent = testMessage.content;
  container.appendChild(li);
  m.value = '';
  return false;
};

socket.on('message', function (msg) {
  // TODO container.textContent
  var li = document.createElement('li');
  li.textContent = msg.content;
  container.appendChild(li);
});

socket.on('info', function (msg) {
  var li = document.createElement('li');
  li.textContent = msg.message;
  container.appendChild(li);
});
