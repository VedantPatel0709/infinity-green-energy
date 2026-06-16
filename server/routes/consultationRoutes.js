const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createConsultation,
  getMyConsultations,
  getConsultations,
  updateConsultation
} = require('../controllers/consultationController');

router.route('/')
  .post(protect, createConsultation)
  .get(protect, admin, getConsultations);

router.route('/my')
  .get(protect, getMyConsultations);

router.route('/:id')
  .put(protect, admin, updateConsultation);

module.exports = router;
