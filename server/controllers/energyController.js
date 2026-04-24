const Energy = require('../models/energyModel'); // ✅ ADD THIS

const addEnergyData = async (req, res) => {
  try {
    const { monthlyUsage, savings } = req.body;

    const data = await Energy.create({
      user: req.user._id,
      monthlyUsage,
      savings
    });

    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserEnergyData = async (req, res) => {
  try {
    const data = await Energy.find({ user: req.user._id });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addEnergyData,
  getUserEnergyData
};