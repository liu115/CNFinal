var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var path = require('path');
var bodyParser = require('body-parser');
var register = require('./routers/register');
var login = require('./routers/login');
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next){
  res.io = io;
  next();
});

app.use('/register', register);
app.use('/login', login);
app.use('/public', express.static('app/public'));


app.post('/register', (req, res) => {
  // TODO: redirect to /login if success
  console.log('post register request');
  console.log(req.body.id);
  console.log(req.body.password);
  res.send('12345');
});

app.get('/', function(req, res, next) {
  // TODO: check login session, or redirct to /login
  res.sendFile(path.join(__dirname, '../', 'app', 'index.html'));
  console.log('get /');
});

app.get('/chat', function(req, res, next) {
  // TODO: check login session, or redirct to /login
  res.sendFile(path.join(__dirname, '../', 'app', 'chat.html'));
  console.log('get /chat');
});

io.on('connection', function (socket) {
  socket.emit('init', JSON.stringify({ text: 'hello, world!' }));
  socket.on('init', function (data) {
    console.log(data);
  });
});

server.listen(process.env.PORT || 3000);
