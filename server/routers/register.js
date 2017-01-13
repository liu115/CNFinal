const path = require('path');
const router = require('express').Router();
const User = require('../models/user');
const Message = require('../models/message');

router.post('/', (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);

  User.create({
    username,
    password
  }, (err, user) => {
    if (err) return res.status(500).send(err);
    return res.json(user);
  });
});

router.get('/', function(req, res) {
  // TODO: check login session, or redirct to /
  res.sendFile(path.join(__dirname, '../../', 'app', 'register.html'));
  console.log('get /register');
});

// Only for testing
router.get('/list/user', (req, res) => {
  User.find().exec((err, users) => {
    res.json(users);
  });
});
router.get('/list/msg', (req, res) => {
  // Message.create({
  //   content: 'aavsv',
  //   from: '12345',
  //   to: '97734'
  // }, (err, user) => {
  //   if (err) console.log(err);
  // });
  Message.find().exec((err, messages) => {
    res.json(messages);
  });
});

module.exports = router;
