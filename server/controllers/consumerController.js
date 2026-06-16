const ConsumerProfile = require('../models/ConsumerProfile');
const logActivity = require('../utils/activityLogger');

// @desc    Get current user's consumer profile
// @route   GET /api/consumers/profile
// @access  Private
const getMyConsumerProfile = async (req, res) => {
  try {
    const profile = await ConsumerProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Consumer profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update current user's consumer profile
// @route   POST /api/consumers/profile
// @access  Private
const upsertMyConsumerProfile = async (req, res) => {
  const {
    companyName,
    industryType,
    state,
    monthlyElectricityBill,
    annualConsumption,
    connectedLoad,
    address,
    contactPerson,
    designation
  } = req.body;

  try {
    let profile = await ConsumerProfile.findOne({ userId: req.user._id });

    const profileData = {
      userId: req.user._id,
      companyName,
      industryType,
      state,
      monthlyElectricityBill,
      annualConsumption,
      connectedLoad,
      address,
      contactPerson,
      designation
    };

    if (profile) {
      // Update
      profile = await ConsumerProfile.findOneAndUpdate(
        { userId: req.user._id },
        { $set: profileData },
        { new: true, runValidators: true }
      );
      return res.json(profile);
    } else {
      // Create
      profile = await ConsumerProfile.create(profileData);
      return res.status(201).json(profile);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get any consumer profile by user ID
// @route   GET /api/consumers/:userId
// @access  Private/Admin
const getConsumerProfileById = async (req, res) => {
  try {
    const profile = await ConsumerProfile.findOne({ userId: req.params.userId }).populate('userId', 'firstName lastName email phone');
    if (!profile) {
      return res.status(404).json({ message: 'Consumer profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all consumer profiles (Admin only)
// @route   GET /api/consumers
// @access  Private/Admin
const getAllConsumerProfiles = async (req, res) => {
  try {
    const profiles = await ConsumerProfile.find({}).populate('userId', 'firstName lastName email phone accountStatus');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update consumer profile by admin
// @route   PUT /api/consumers/profile/:id
// @access  Private/Admin
const updateConsumerProfileByAdmin = async (req, res) => {
  try {
    let profile = await ConsumerProfile.findById(req.params.id).populate('userId', 'email');
    if (!profile) {
      return res.status(404).json({ message: 'Consumer profile not found' });
    }

    const {
      companyName,
      industryType,
      state,
      monthlyElectricityBill,
      annualConsumption,
      connectedLoad,
      address,
      contactPerson,
      designation
    } = req.body;

    if (companyName) profile.companyName = companyName;
    if (industryType) profile.industryType = industryType;
    if (state) profile.state = state;
    if (monthlyElectricityBill !== undefined) profile.monthlyElectricityBill = Number(monthlyElectricityBill);
    if (annualConsumption !== undefined) profile.annualConsumption = Number(annualConsumption);
    if (connectedLoad !== undefined) profile.connectedLoad = Number(connectedLoad);
    if (address) profile.address = address;
    if (contactPerson) profile.contactPerson = contactPerson;
    if (designation) profile.designation = designation;

    const updatedProfile = await profile.save();
    await logActivity(req.user._id, 'CONSUMER_PROFILE_UPDATE', `Admin updated consumer profile for user ${profile.userId ? profile.userId.email : profile._id}`, req);

    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getMyConsumerProfile,
  upsertMyConsumerProfile,
  getConsumerProfileById,
  getAllConsumerProfiles,
  updateConsumerProfileByAdmin
};
