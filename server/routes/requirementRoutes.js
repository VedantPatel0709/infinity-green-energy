const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createRequirement,
  getMyRequirements,
  getRequirements,
  updateRequirement
} = require('../controllers/requirementController');

router.route('/')
  .post(protect, createRequirement)
  .get(protect, getRequirements);

router.route('/my')
  .get(protect, getMyRequirements);

router.route('/:id')
  .put(protect, updateRequirement);

module.exports = router;
