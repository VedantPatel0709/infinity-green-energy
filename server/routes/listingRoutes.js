const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createListing,
  getMyListings,
  getListings,
  updateListing,
  deleteListing
} = require('../controllers/listingController');

router.route('/')
  .post(protect, createListing)
  .get(getListings);

router.route('/my')
  .get(protect, getMyListings);

router.route('/:id')
  .put(protect, updateListing)
  .delete(protect, deleteListing);

module.exports = router;
