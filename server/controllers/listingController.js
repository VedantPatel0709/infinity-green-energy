const EnergyListing = require('../models/EnergyListing');

// @desc    Create a new energy marketplace listing
// @route   POST /api/listings
// @access  Private
const createListing = async (req, res) => {
  const { energyType, capacityAvailable, tariff, location, availabilityDate, notes } = req.body;

  try {
    const listing = await EnergyListing.create({
      userId: req.user._id,
      energyType,
      capacityAvailable: Number(capacityAvailable),
      tariff: Number(tariff),
      location,
      availabilityDate: availabilityDate ? new Date(availabilityDate) : undefined,
      notes,
      status: 'active'
    });
    res.status(201).json(listing);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get current producer's energy listings
// @route   GET /api/listings/my
// @access  Private
const getMyListings = async (req, res) => {
  try {
    const listings = await EnergyListing.find({ userId: req.user._id, status: { $ne: 'deleted' } }).sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all active energy listings (Marketplace)
// @route   GET /api/listings
// @access  Public
const getListings = async (req, res) => {
  try {
    const listings = await EnergyListing.find({ status: 'active' })
      .populate('userId', 'firstName lastName email companyName phone')
      .sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update / Archive energy listing
// @route   PUT /api/listings/:id
// @access  Private
const updateListing = async (req, res) => {
  const { energyType, capacityAvailable, tariff, location, availabilityDate, notes, status } = req.body;

  try {
    const listing = await EnergyListing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (energyType) listing.energyType = energyType;
    if (capacityAvailable !== undefined) listing.capacityAvailable = Number(capacityAvailable);
    if (tariff !== undefined) listing.tariff = Number(tariff);
    if (location) listing.location = location;
    if (availabilityDate) listing.availabilityDate = new Date(availabilityDate);
    if (notes !== undefined) listing.notes = notes;
    if (status) listing.status = status;

    const updated = await listing.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete energy listing (soft delete)
// @route   DELETE /api/listings/:id
// @access  Private
const deleteListing = async (req, res) => {
  try {
    const listing = await EnergyListing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }

    if (listing.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized' });
    }

    listing.status = 'deleted';
    await listing.save();
    res.json({ message: 'Listing removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createListing,
  getMyListings,
  getListings,
  updateListing,
  deleteListing
};
