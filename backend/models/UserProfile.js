const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  bio: { type: String, default: '' },
  profilePicture: { type: String, default: '' },
});

module.exports = mongoose.model('UserProfile', userProfileSchema);
