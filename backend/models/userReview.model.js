const mongoose = require('mongoose');

const userReviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  foodItemId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const UserReview = mongoose.model('UserReview', userReviewSchema);
module.exports = UserReview;
