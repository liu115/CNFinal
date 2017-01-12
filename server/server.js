var path = require('path');

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 3000);

app.use(function(req, res, next){
  res.io = io;
  next();
});

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'app', 'index.html'));
  console.log('get /');
});

app.use('/public', express.static('app/public'));

io.on('connection', function (socket) {
  socket.emit('init', JSON.stringify({ text: 'hello, world!' }));
  socket.on('init', function (data) {
    console.log(data);
  });
});
