const express = require('express');
const multer = require('multer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const verifyToken = require('./middleware/verifyToken.js');
const FoodItem = require('./models/FoodItem');
const User = require('./models/User'); 
const mongoDB = require('./db');
require('dotenv').config();
const cors = require('cors');


const app = express();
const port = 5000;

mongoDB();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); 
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    },
});
const upload = multer({ storage });

// const isAdmin = (req, res, next) => {
//     const token = req.header('Authorization')?.replace('Bearer ', '');
//     if (!token) {
//         return res.status(403).json({ message: 'No token provided' });
//     }
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         if (decoded.role === 'admin') {
//             req.user = decoded;
//             next();
//         } else {
//             return res.status(403).json({ message: 'Access denied. Admins only.' });
//         }
//     } catch (error) {
//         return res.status(401).json({ message: 'Invalid token' });
//     }
// };

const adminRoutes = express.Router();

adminRoutes.post('/admin-login', (req, res) => {
    const { email, password } = req.body;
    if (email === 'admin@example.com' && password === 'admin123') {
        const token = jwt.sign({ email, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '10d' });
        return res.status(200).json({ success: true, token });
    } else {
        return res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
});
app.use('/api/admin', adminRoutes);
adminRoutes.post('/add-food-item', upload.single('image'), async(req, res) => {
    const { name, halfPrice, fullPrice } = req.body;
    const image = req.file;
    
    

    if (!name || !halfPrice || !fullPrice || !image) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const newFoodItem = new FoodItem({
        name,
        halfPrice,
        fullPrice,
        image: image.path, 
    });
    await newFoodItem.save();
    res.status(201).json({
        success: true,
        message: 'Food item added successfully',
        foodItem: newFoodItem,
    });
});
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api/reviews', require("./Routes/ReviewRoutes"));
app.use('/api/user-profiles', require("./Routes/userProfileRoutes"));

app.use('/uploads', express.static('uploads'));
app.use((err, req, res, next) => {
    if (err instanceof multer.MulterError || err.message.includes('Invalid file type')) {
        return res.status(400).json({ message: err.message });
    }
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
