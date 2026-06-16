const express = require('express');
const router = express.Router();
const { 
  createLead, 
  getLeads, 
  updateLead, 
  addLeadNote, 
  assignLead, 
  getLeadAnalytics 
} = require('../controllers/leadController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(createLead)
  .get(protect, admin, getLeads);

router.route('/analytics')
  .get(protect, admin, getLeadAnalytics);

router.route('/:id')
  .put(protect, admin, updateLead);

router.route('/:id/notes')
  .post(protect, admin, addLeadNote);

router.route('/:id/assign')
  .post(protect, admin, assignLead);

module.exports = router;
