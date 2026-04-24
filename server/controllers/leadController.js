const Lead = require('../models/Lead');

// @desc    Register a new lead
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
  const { name, email, phone, company, bill, message } = req.body;

  try {
    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      bill,
      message,
    });

    if (lead) {
      res.status(201).json(lead);
    } else {
      res.status(400);
      throw new Error('Invalid lead data');
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private/Admin
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createLead, getLeads };
