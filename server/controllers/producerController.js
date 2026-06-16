const ProducerProfile = require('../models/ProducerProfile');
const logActivity = require('../utils/activityLogger');

// @desc    Get current user's producer profile
// @route   GET /api/producers/profile
// @access  Private
const getMyProducerProfile = async (req, res) => {
  try {
    const profile = await ProducerProfile.findOne({ userId: req.user._id });
    if (!profile) {
      return res.status(404).json({ message: 'Producer profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create or update current user's producer profile
// @route   POST /api/producers/profile
// @access  Private
const upsertMyProducerProfile = async (req, res) => {
  const {
    companyName,
    energyType,
    plantCapacity,
    location,
    tariff,
    availability,
    certifications,
    documents
  } = req.body;

  try {
    let profile = await ProducerProfile.findOne({ userId: req.user._id });

    const profileData = {
      userId: req.user._id,
      companyName,
      energyType,
      plantCapacity,
      location,
      tariff,
      availability,
      certifications,
      documents
    };

    if (profile) {
      // Update
      profile = await ProducerProfile.findOneAndUpdate(
        { userId: req.user._id },
        { $set: profileData },
        { new: true, runValidators: true }
      );
      return res.json(profile);
    } else {
      // Create
      profile = await ProducerProfile.create(profileData);
      return res.status(201).json(profile);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get any producer profile by user ID
// @route   GET /api/producers/:userId
// @access  Private/Admin
const getProducerProfileById = async (req, res) => {
  try {
    const profile = await ProducerProfile.findOne({ userId: req.params.userId }).populate('userId', 'firstName lastName email phone');
    if (!profile) {
      return res.status(404).json({ message: 'Producer profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all producer profiles (Admin only)
// @route   GET /api/producers
// @access  Private/Admin
const getAllProducerProfiles = async (req, res) => {
  try {
    const profiles = await ProducerProfile.find({}).populate('userId', 'firstName lastName email phone accountStatus');
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update producer profile by admin
// @route   PUT /api/producers/profile/:id
// @access  Private/Admin
const updateProducerProfileByAdmin = async (req, res) => {
  try {
    let profile = await ProducerProfile.findById(req.params.id).populate('userId', 'email');
    if (!profile) {
      return res.status(404).json({ message: 'Producer profile not found' });
    }

    const {
      companyName,
      energyType,
      plantCapacity,
      location,
      tariff,
      availability,
      certifications,
      documents
    } = req.body;

    if (companyName) profile.companyName = companyName;
    if (energyType) profile.energyType = energyType;
    if (plantCapacity !== undefined) profile.plantCapacity = Number(plantCapacity);
    if (location) profile.location = location;
    if (tariff !== undefined) profile.tariff = Number(tariff);
    if (availability) profile.availability = availability;
    if (certifications) profile.certifications = certifications;
    if (documents) profile.documents = documents;

    const updatedProfile = await profile.save();
    await logActivity(req.user._id, 'PRODUCER_PROFILE_UPDATE', `Admin updated producer profile for user ${profile.userId ? profile.userId.email : profile._id}`, req);

    res.json(updatedProfile);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getMyProducerProfile,
  upsertMyProducerProfile,
  getProducerProfileById,
  getAllProducerProfiles,
  updateProducerProfileByAdmin
};
