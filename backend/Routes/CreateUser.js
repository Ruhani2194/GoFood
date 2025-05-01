const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('../models/User.js');

const jwtSecret = process.env.JWT_SECRET || 'ourteamprojectromaniruhanironitrishabh';
const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/createuser', [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password', 'Password should be at least 5 characters').isLength({ min: 5 }),
  body('name').not().isEmpty().withMessage('Name is required'),
  body('role').isIn(['user', 'admin']).withMessage('Role must be either "user" or "admin"'),
  body('geolocation').not().isEmpty().withMessage('Geolocation is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password, geolocation, role } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user ) {
      return res.status(200).json({ success: true, message: 'A user with this email already exists, but you can create another with a different role.' });
    }

    user = new User({
      name,
      email,
      password,
      geolocation,
      role
    });

    const salt = await bcrypt.genSalt(10);
    
    
    user.password = await bcrypt.hash(password, salt);
    
    
    await user.save();

    const payload = {
      user: { id: user.id, role: user.role }
    };

    const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

    res.status(201).json({ success: true, message: 'User created successfully', authToken, role: user.role });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/loginuser', [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password', 'Password is required').exists().withMessage('Password is required')
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;
  
  
  try {
    let user = await User.findOne({ email });
    console.log("User",user);
    
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const payload = {
      user: { id: user.id, role: user.role }
    };

    const authToken = jwt.sign(payload, jwtSecret, { expiresIn: '1d' });
    console.log(authToken);
    
    res.json({
      success: true,
      authToken,
      role: user.role,
      userData: user
    });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/getUserByEmail/:email', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.params.email });
    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
