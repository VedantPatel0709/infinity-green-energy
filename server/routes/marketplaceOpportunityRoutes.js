const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createOpportunity,
  getMyOpportunities,
  getOpportunities,
  updateOpportunity
} = require('../controllers/marketplaceOpportunityController');

router.route('/')
  .post(protect, admin, createOpportunity)
  .get(protect, admin, getOpportunities);

router.route('/my')
  .get(protect, getMyOpportunities);

router.route('/:id')
  .put(protect, updateOpportunity);

module.exports = router;
