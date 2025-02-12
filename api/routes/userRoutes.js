const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

// Get user by firstname+lastname (firstnamelastname) format in URL
router.get('/:firstnamelastname', async (req, res) => {
    const { firstnamelastname } = req.params;

    try {
        const user = await userService.getUserByFirstLast(firstnamelastname);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
