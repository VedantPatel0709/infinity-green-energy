const express = require('express');
const router = express.Router();
const { createLead, getLeads } = require('../controllers/leadController');
const { protect, admin } = require('../middleware/authMiddleware');

/**
 * Lead Routes
 */
router.route('/').post(createLead).get(protect, admin, getLeads);

module.exports = router;
