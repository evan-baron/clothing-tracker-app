const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');

// Assign sub-route paths
router.use('/', userRoutes);
router.use('/', authRoutes);

module.exports = router;