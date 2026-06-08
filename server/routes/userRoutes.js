const express = require('express');
const router = express.Router();

// Import controllers
const { registerUser, authUser } = require('../controllers/userController');

// 🔍 TEST ROUTE (for debugging — remove later if you want)
router.get('/test', (req, res) => {
  res.send('✅ User routes working');
});

/**
 * User Routes
 */

// Register user
router.post('/register', registerUser);

// Login user
router.post('/login', authUser);

module.exports = router;