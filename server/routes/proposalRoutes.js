const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createProposal,
  getMyProposals,
  getProposals,
  updateProposal
} = require('../controllers/proposalController');

router.route('/')
  .post(protect, createProposal)
  .get(protect, admin, getProposals);

router.route('/my')
  .get(protect, getMyProposals);

router.route('/:id')
  .put(protect, updateProposal);

module.exports = router;
