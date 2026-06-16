const Opportunity = require('../models/Opportunity');
const EnergyRequirement = require('../models/EnergyRequirement');
const EnergyListing = require('../models/EnergyListing');
const User = require('../models/User');
const logActivity = require('../utils/activityLogger');
const { sendNotification } = require('../utils/notificationService');

// @desc    Create a manual match opportunity (Admin only)
// @route   POST /api/marketplace-opportunities
// @access  Private/Admin
const createOpportunity = async (req, res) => {
  const { consumerId, producerId, listingId, requirementId, notes } = req.body;

  try {
    const opp = await Opportunity.create({
      consumerId,
      producerId,
      listingId,
      requirementId,
      notes,
      status: 'new'
    });

    // Update states to matched
    await EnergyRequirement.findByIdAndUpdate(requirementId, { status: 'matched' });

    await logActivity(req.user._id, 'OPPORTUNITY_MATCH', `Manually matched consumer requirement with producer listing`, req);

    // Fetch consumer and producer details for template
    const [consumerUser, producerUser, listing] = await Promise.all([
      User.findById(consumerId),
      User.findById(producerId),
      EnergyListing.findById(listingId)
    ]);

    // Send notifications to both parties
    if (consumerUser && producerUser) {
      const capacityVal = listing ? listing.capacityAvailable : 0;
      
      // Consumer notify
      await sendNotification({
        userId: consumerId,
        templateId: 'opportunity_matched',
        variables: {
          consumer: consumerUser.companyName || 'You',
          producer: producerUser.companyName || 'Producer Partner',
          capacity: capacityVal
        },
        type: 'email'
      });

      // Producer notify
      await sendNotification({
        userId: producerId,
        templateId: 'opportunity_matched',
        variables: {
          consumer: consumerUser.companyName || 'Consumer Partner',
          producer: producerUser.companyName || 'You',
          capacity: capacityVal
        },
        type: 'email'
      });
    }

    res.status(201).json(opp);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get opportunities for current user (either consumer or producer)
// @route   GET /api/marketplace-opportunities/my
// @access  Private
const getMyOpportunities = async (req, res) => {
  try {
    const opps = await Opportunity.find({
      $or: [
        { consumerId: req.user._id },
        { producerId: req.user._id }
      ]
    })
      .populate('consumerId', 'firstName lastName email companyName phone')
      .populate('producerId', 'firstName lastName email companyName phone')
      .populate('listingId')
      .populate('requirementId')
      .sort({ createdAt: -1 });

    res.json(opps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all opportunities (Admin only)
// @route   GET /api/marketplace-opportunities
// @access  Private/Admin
const getOpportunities = async (req, res) => {
  try {
    const opps = await Opportunity.find({})
      .populate('consumerId', 'firstName lastName email companyName phone')
      .populate('producerId', 'firstName lastName email companyName phone')
      .populate('listingId')
      .populate('requirementId')
      .sort({ createdAt: -1 });

    res.json(opps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update opportunity status or notes
// @route   PUT /api/marketplace-opportunities/:id
// @access  Private
const updateOpportunity = async (req, res) => {
  const { status, notes } = req.body;

  try {
    const opp = await Opportunity.findById(req.params.id);
    if (!opp) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    if (status) opp.status = status;
    if (notes !== undefined) opp.notes = notes;

    const updated = await opp.save();
    await logActivity(req.user._id, 'OPPORTUNITY_UPDATE', `Updated opportunity status to ${status || opp.status}`, req);

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createOpportunity,
  getMyOpportunities,
  getOpportunities,
  updateOpportunity
};
