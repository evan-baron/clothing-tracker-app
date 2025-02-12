const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Register a new user
router.post('/register', async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

	const userExists = await userService.checkIfUserExists(email);

	if (userExists) {
		return res.status(400).json({ message: 'Email already in use' });
	}

    const missingData = [];

    // Check for missing fields
    if (!first_name) missingData.push('First Name');
    if (!last_name) missingData.push('Last Name');
    if (!email) missingData.push('Email');
    if (!password) missingData.push('Password');

    if (missingData.length > 0) {
        return res.status(400).json({ message: `Missing data required: ${missingData.join(', ')}.` });
    }

    try {
        const newUser = await userService.createUser(first_name, last_name, email, password);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
