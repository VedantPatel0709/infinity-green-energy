const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getMyConsumerProfile,
  upsertMyConsumerProfile,
  getConsumerProfileById,
  getAllConsumerProfiles,
  updateConsumerProfileByAdmin
} = require('../controllers/consumerController');

router.route('/profile')
  .get(protect, getMyConsumerProfile)
  .post(protect, upsertMyConsumerProfile);

router.route('/profile/:id')
  .put(protect, admin, updateConsumerProfileByAdmin);

router.route('/')
  .get(protect, admin, getAllConsumerProfiles);

router.route('/:userId')
  .get(protect, admin, getConsumerProfileById);

module.exports = router;
