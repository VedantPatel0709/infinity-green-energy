const BuyerOpportunity = require('../models/BuyerOpportunity');

// @desc    Create a new buyer opportunity listing (Public or Admin or system generated)
// @route   POST /api/opportunities
// @access  Private
const createOpportunity = async (req, res) => {
  const { companyName, industryType, requiredCapacity, location, status } = req.body;

  try {
    const opp = await BuyerOpportunity.create({
      consumerId: req.user ? req.user._id : undefined,
      companyName,
      industryType,
      requiredCapacity: Number(requiredCapacity),
      location,
      status: status || 'new'
    });
    res.status(201).json(opp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all buyer opportunities (Marketplace matching)
// @route   GET /api/opportunities
// @access  Private
const getOpportunities = async (req, res) => {
  try {
    const opps = await BuyerOpportunity.find({}).sort({ createdAt: -1 });
    res.json(opps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update opportunity details
// @route   PUT /api/opportunities/:id
// @access  Private
const updateOpportunity = async (req, res) => {
  const { status } = req.body;

  try {
    const opp = await BuyerOpportunity.findById(req.params.id);
    if (!opp) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    if (status) opp.status = status;
    const updated = await opp.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOpportunity,
  getOpportunities,
  updateOpportunity
};
