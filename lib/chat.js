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
  m.value = '';
  return false;
};

socket.on('message', function (msg) {
  // TODO container.textContent
  var li = document.createElement('li');
  li.textContent = msg.content;
  container.appendChild(li);
});
