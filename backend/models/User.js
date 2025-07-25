const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePic: { type: String, default: '' },
  role: { type: String, enum: ['admin', 'user'], default: 'user'}
});

const User = mongoose.model('User', userSchema);
module.exports = User;
