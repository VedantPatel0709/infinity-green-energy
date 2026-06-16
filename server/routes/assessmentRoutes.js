const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createAssessment,
  getMyAssessments,
  getAssessments,
  updateAssessment
} = require('../controllers/assessmentController');

router.route('/')
  .post(protect, createAssessment)
  .get(protect, admin, getAssessments);

router.route('/my')
  .get(protect, getMyAssessments);

router.route('/:id')
  .put(protect, admin, updateAssessment);

module.exports = router;
