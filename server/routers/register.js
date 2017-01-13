const path = require('path');
const router = require('express').Router();
const User = require('../models/user');
const Message = require('../models/message');

router.post('/', (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);
  User.findOne({ username: username }, (err, data) => {
    if (err) console.log('find error');
    if (data === null) return 0;
    else res.json({ success: 'false' });
  });

  User.create({
    username,
    password
  }, (err, user) => {
    if (err) return res.status(500).send(err);
    console.log(user);
    return res.json({ success: 'true' });
  });
});

router.get('/', function(req, res) {
  // TODO: check login session, or redirct to /
  res.sendFile(path.join(__dirname, '../../', 'app', 'register.html'));
  console.log('get /register');
});

// Only for testing
router.get('/list/user', (req, res) => {
  User.find({}, 'username').exec((err, users) => {
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
