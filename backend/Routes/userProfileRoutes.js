const express = require('express');
const router = express.Router();
const UserProfile = require('../models/UserProfile.js');
const { uploadoncloundinary } = require('../utlis/cloudinary');
const upload = require('../middleware/multer.middleware');

router.post('/', upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    const existingProfile = await UserProfile.findOne({ email });
    if (existingProfile) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    let profilePicture = '';

    if (req.file) {
      const uploadResult = await uploadoncloundinary(req.file.path);
      profilePicture = uploadResult.secure_url;
    }

    const newProfile = new UserProfile({ name, email, bio, profilePicture });
    await newProfile.save();

    res.status(201).json(newProfile);
  } catch (error) {
    console.error('Error Creating Profile:', error.message);
    res.status(400).json({ message: error.message });
  }
});
router.get('/', async (req, res) => {
    try {
      const profiles = await UserProfile.find();
      res.status(200).json(profiles);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  
  router.get('/:id', async (req, res) => {
    try {
      const profile = await UserProfile.findById(req.params.id);
      if (!profile) return res.status(404).json({ message: 'Profile not found' });
      res.status(200).json(profile);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

router.put('/:id', upload.single('profilePicture'), async (req, res) => {
  try {
    const { name, email, bio } = req.body;
    let profilePicture;

    if (req.file) {
      const uploadResult = await uploadoncloundinary(req.file.path);
      profilePicture = uploadResult.secure_url;
    }

    const updateData = { name, email, bio };
    if (profilePicture) updateData.profilePicture = profilePicture;

    const updatedProfile = await UserProfile.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedProfile) return res.status(404).json({ message: 'Profile not found' });

    res.status(200).json(updatedProfile);
  } catch (error) {
    console.error('Error Updating Profile:', error.message);
    res.status(400).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const profile = await UserProfile.findByIdAndDelete(req.params.id);
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});


module.exports = router;
