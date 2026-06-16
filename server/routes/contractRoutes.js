const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  createContract,
  getContracts,
  getMyContracts,
  updateContract,
  signContract
} = require('../controllers/contractController');

router.route('/')
  .post(protect, admin, createContract)
  .get(protect, admin, getContracts);

router.route('/my')
  .get(protect, getMyContracts);

router.route('/:id')
  .put(protect, updateContract);

router.route('/:id/sign')
  .post(protect, signContract);

module.exports = router;
