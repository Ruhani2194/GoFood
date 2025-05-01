const express = require('express');
const router = express.Router();
const UserReview = require('../models/userReview.model');
router.post('/', async (req, res) => {
  try {
    const { userId, foodItemId, rating, review } = req.body;
    const newReview = new UserReview({ userId, foodItemId, rating, review });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const reviews = await UserReview.find();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const review = await UserReview.findById(req.params.id);
    if (!review) return res.status(404).json({ message: 'Review not found' });
    res.status(200).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = router;
