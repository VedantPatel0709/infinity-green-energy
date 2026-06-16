const Document = require('../models/Document');

// @desc    Upload document metadata
// @route   POST /api/documents
// @access  Private
const uploadDocument = async (req, res) => {
  const { documentType, fileName, fileUrl } = req.body;

  if (!documentType || !fileName || !fileUrl) {
    return res.status(400).json({ message: 'Please provide all required fields' });
  }

  try {
    const document = await Document.create({
      userId: req.user._id,
      documentType,
      fileName,
      fileUrl
    });

    res.status(201).json(document);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get current user's documents
// @route   GET /api/documents/my
// @access  Private
const getMyDocuments = async (req, res) => {
  try {
    const documents = await Document.find({ userId: req.user._id }).sort({ uploadedAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all documents
// @route   GET /api/documents
// @access  Private/Admin
const getDocuments = async (req, res) => {
  try {
    const documents = await Document.find({})
      .populate('userId', 'firstName lastName email companyName role')
      .sort({ uploadedAt: -1 });
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete document by ID
// @route   DELETE /api/documents/:id
// @access  Private
const deleteDocument = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);

    if (!document) {
      return res.status(404).json({ message: 'Document not found' });
    }

    // Allow user to delete their own, or admin to delete any
    if (document.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await Document.findByIdAndDelete(req.params.id);
    res.json({ message: 'Document removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadDocument,
  getMyDocuments,
  getDocuments,
  deleteDocument
};
