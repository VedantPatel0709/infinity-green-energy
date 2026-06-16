const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  getMyProducerProfile,
  upsertMyProducerProfile,
  getProducerProfileById,
  getAllProducerProfiles,
  updateProducerProfileByAdmin
} = require('../controllers/producerController');

router.route('/profile')
  .get(protect, getMyProducerProfile)
  .post(protect, upsertMyProducerProfile);

router.route('/profile/:id')
  .put(protect, admin, updateProducerProfileByAdmin);

router.route('/')
  .get(protect, admin, getAllProducerProfiles);

router.route('/:userId')
  .get(protect, admin, getProducerProfileById);

module.exports = router;
