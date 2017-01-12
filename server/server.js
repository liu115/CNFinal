var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var path = require('path');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next){
  res.io = io;
  next();
});

app.post('/login', (req, res) => {
  console.log('post login request');
  console.log(req.body.id);
  console.log(req.body.password);
  res.send('12345');
});

app.post('/register', (req, res) => {
  console.log('post register request');
  console.log(req.body.id);
  console.log(req.body.password);
  res.send('12345');
});

app.get('/', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'app', 'index.html'));
  console.log('get /');
});

app.get('/chat', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'app', 'chat.html'));
  console.log('get /chat');
});

app.get('/login', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'app', 'login.html'));
  console.log('get /login');
});

app.get('/register', function(req, res, next) {
  res.sendFile(path.join(__dirname, '../', 'app', 'register.html'));
  console.log('get /register');
});

app.use('/public', express.static('app/public'));

io.on('connection', function (socket) {
  socket.emit('init', JSON.stringify({ text: 'hello, world!' }));
  socket.on('init', function (data) {
    console.log(data);
  });
});

server.listen(process.env.PORT || 3000);
