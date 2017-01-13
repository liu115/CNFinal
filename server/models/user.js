var mongoose = require('mongoose');
var setting = require('../config/config.js');
const dburl = `mongodb://${setting.username}:${setting.password}@${setting.mongoUrl}`;

var userDB = mongoose.createConnection(`${dburl}/myusers/?ssl=true`, (err) => {
  if (err) {
    console.log('Users DB Connection Error: ' + err);
  }
});

const options = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

const UserSchema = new mongoose.Schema({
  // userId: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, require: true }
}, options);

module.exports = userDB.model('User', UserSchema);
