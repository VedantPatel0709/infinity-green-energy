const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createOpportunity,
  getOpportunities,
  updateOpportunity
} = require('../controllers/opportunityController');

router.route('/')
  .post(protect, createOpportunity)
  .get(protect, getOpportunities);

router.route('/:id')
  .put(protect, updateOpportunity);

module.exports = router;
