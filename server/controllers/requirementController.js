const EnergyRequirement = require('../models/EnergyRequirement');
const logActivity = require('../utils/activityLogger');

// @desc    Create a new energy requirement
// @route   POST /api/requirements
// @access  Private
const createRequirement = async (req, res) => {
  const { industry, state, requiredCapacity, monthlyConsumption, preferredTariff, notes } = req.body;

  try {
    const reqItem = await EnergyRequirement.create({
      userId: req.user._id,
      industry,
      state,
      requiredCapacity: Number(requiredCapacity),
      monthlyConsumption: Number(monthlyConsumption),
      preferredTariff: Number(preferredTariff),
      notes,
      status: 'open'
    });

    await logActivity(req.user._id, 'REQUIREMENT_CREATE', `Created energy requirement of ${requiredCapacity} MW`, req);

    res.status(201).json(reqItem);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get logged in user's requirements
// @route   GET /api/requirements/my
// @access  Private
const getMyRequirements = async (req, res) => {
  try {
    const reqs = await EnergyRequirement.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(reqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all requirements (Admin and Marketplace view)
// @route   GET /api/requirements
// @access  Private
const getRequirements = async (req, res) => {
  try {
    const reqs = await EnergyRequirement.find({})
      .populate('userId', 'firstName lastName email companyName phone')
      .sort({ createdAt: -1 });
    res.json(reqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update requirement status
// @route   PUT /api/requirements/:id
// @access  Private/Admin
const updateRequirement = async (req, res) => {
  const { status, notes } = req.body;

  try {
    const reqItem = await EnergyRequirement.findById(req.params.id);
    if (!reqItem) {
      return res.status(404).json({ message: 'Requirement not found' });
    }

    if (status) reqItem.status = status;
    if (notes !== undefined) reqItem.notes = notes;

    const updated = await reqItem.save();
    await logActivity(req.user._id, 'REQUIREMENT_UPDATE', `Updated requirement status to ${status || reqItem.status}`, req);

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createRequirement,
  getMyRequirements,
  getRequirements,
  updateRequirement
};
