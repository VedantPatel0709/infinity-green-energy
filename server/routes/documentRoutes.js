const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const {
  uploadDocument,
  getMyDocuments,
  getDocuments,
  deleteDocument
} = require('../controllers/documentController');

router.route('/')
  .post(protect, uploadDocument)
  .get(protect, admin, getDocuments);

router.route('/my')
  .get(protect, getMyDocuments);

router.route('/:id')
  .delete(protect, deleteDocument);

module.exports = router;
