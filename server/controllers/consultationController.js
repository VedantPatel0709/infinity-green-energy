const Consultation = require('../models/Consultation');
const { sendNotification } = require('../utils/notificationService');

// @desc    Request a new consultation
// @route   POST /api/consultations
// @access  Private
const createConsultation = async (req, res) => {
  const { consultationType, notes } = req.body;

  try {
    const consultation = await Consultation.create({
      userId: req.user._id,
      consultationType,
      notes,
      status: 'pending'
    });

    // Event-based notification trigger
    await sendNotification({
      userId: req.user._id,
      templateId: 'consultation_created',
      variables: {
        name: req.user.firstName || req.user.name || 'Client',
        company: req.user.companyName || 'your facility'
      },
      type: 'in_app'
    });

    res.status(201).json(consultation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get user's consultations
// @route   GET /api/consultations/my
// @access  Private
const getMyConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all consultations
// @route   GET /api/consultations
// @access  Private/Admin
const getConsultations = async (req, res) => {
  try {
    const consultations = await Consultation.find({})
      .populate('userId', 'firstName lastName email phone companyName')
      .populate('assignedAdmin', 'firstName lastName email')
      .sort({ createdAt: -1 });
    res.json(consultations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update consultation details/status/assign admin
// @route   PUT /api/consultations/:id
// @access  Private/Admin
const updateConsultation = async (req, res) => {
  const { status, notes, assignedAdmin } = req.body;

  try {
    const consultation = await Consultation.findById(req.params.id);

    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }

    const oldStatus = consultation.status;
    if (status) consultation.status = status;
    if (notes !== undefined) consultation.notes = notes;
    if (assignedAdmin !== undefined) consultation.assignedAdmin = assignedAdmin;

    const updatedConsultation = await consultation.save();

    // Event-based notification trigger upon status update (e.g. scheduling/confirming)
    if (status && status !== oldStatus) {
      await sendNotification({
        userId: consultation.userId,
        templateId: status === 'scheduled' ? 'consultation_scheduled' : 'consultation_created',
        variables: {
          name: 'Client',
          date: new Date().toLocaleDateString(),
          inspector: 'Infinity Lead Energy Auditor'
        },
        type: 'email'
      });
    }

    res.json(updatedConsultation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createConsultation,
  getMyConsultations,
  getConsultations,
  updateConsultation
};
