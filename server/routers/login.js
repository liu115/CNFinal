const path = require('path');
const router = require('express').Router();
const User = require('../models/user');

router.post('/', (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);

  // TODO: redirect to / if success
  console.log('post login request');

  res.send('12345');
});

router.get('/', function(req, res) {
  // TODO: check login session, or redirct to /
  res.sendFile(path.join(__dirname, '../../', 'app', 'login.html'));
  console.log('get /login');
});

module.exports = router;
