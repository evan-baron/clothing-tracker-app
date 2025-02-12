const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');  // Make sure you have the token verification middleware
const userService = require('../services/userService');

// Get user profile (based on token)
router.get('/profile', verifyToken, async (req, res) => {
    const loggedInUser = req.user; // Extracted user info from the token
	console.log(loggedInUser);

    try {
        // Fetch user details based on the user ID in the token
        const user = await userService.getUserById(loggedInUser.id);

        // If no user is found (which should be rare), send an error
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the user profile data
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
