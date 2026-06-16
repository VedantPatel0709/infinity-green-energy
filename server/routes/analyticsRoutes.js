const express = require('express');
const router = express.Router();
const { getBIReport } = require('../controllers/analyticsController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/', protect, admin, getBIReport);

module.exports = router;
