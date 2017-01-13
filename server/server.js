var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var path = require('path');
var bodyParser = require('body-parser');
var register = require('./routers/register');
var login = require('./routers/login');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser')

var User = require('./models/user');

mongoose.Promise = global.Promise;

app.use(cookieParser());
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

var chat_socket = io.of('/chat');
app.get('/chat/:id', function(req, res) {
  // TODO: check login session, or redirct to /login
  res.sendFile(path.join(__dirname, '../', 'app', 'chat.html'));


  console.log('get /chat');
});

io.on('connection', function (socket) {
  console.log('connect /');
  socket.on('init', function (data, fn) {
    var json = JSON.parse(data);
    User.find({}, 'username userId').exec((err, users) => {
      if (err) return fn(JSON.stringify({ success: 'false' }));
      console.log(users);
      var sendback = {
        success: 'true',
        friends: users.map(user => ({
          name: user.username,
          userId: user.userId
        }))
      };
      return fn(JSON.stringify(sendback));
    });
    console.log(data.token);
  });
  socket.on('disconnect', function () {
    console.log('disconnect with client');
  });
});

chat_socket.on('connection', function (socket) {
  console.log('connect /chat with ');
  //console.log(socket.handshake.with);
  socket.on('disconnect', function () {
    console.log('disconnect with client');
  });
});

server.listen(process.env.PORT || 3000);
