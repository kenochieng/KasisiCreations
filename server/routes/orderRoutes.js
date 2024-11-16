const express = require('express');
const User = require('../models/Order'); // Ensure this path is correct
const router = express.Router();

// POST /api/users/register
router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) return res.status(400).json({ message: 'User already exists' });

        // Create a new user
        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

module.exports = router;
