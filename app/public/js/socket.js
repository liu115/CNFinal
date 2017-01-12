var socket = io('//localhost:3000');

socket.on('init', function (data) {
  console.log(data);
  console.log(JSON.parse(data).text);
  socket.emit('init ack');
});


socket.on('message', function (data) {
  console.log(data);
  socket.emit('message ack');
});
