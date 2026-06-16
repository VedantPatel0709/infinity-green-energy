const Proposal = require('../models/Proposal');
const Contract = require('../models/Contract');
const logActivity = require('../utils/activityLogger');
const { sendNotification } = require('../utils/notificationService');

// @desc    Create a new proposal
// @route   POST /api/proposals
// @access  Private
const createProposal = async (req, res) => {
  const { 
    userId, 
    producerId, 
    opportunity, 
    amount, 
    notes, 
    proposalNumber, 
    capacityRequirement, 
    estimatedTariff, 
    validUntil,
    status 
  } = req.body;

  try {
    const proposal = await Proposal.create({
      userId: userId || req.user._id,
      producerId: producerId || undefined,
      opportunity: opportunity || undefined,
      amount: Number(amount || 0),
      notes: notes || '',
      proposalNumber,
      capacityRequirement: capacityRequirement || '',
      estimatedTariff: Number(estimatedTariff || 0),
      status: status || 'draft',
      validUntil: validUntil ? new Date(validUntil) : undefined
    });

    await logActivity(req.user._id, 'PROPOSAL_CREATE', `Created proposal ${proposalNumber}`, req);

    // If proposal is issued directly (under review), notify the consumer
    if (proposal.status === 'under_review') {
      await sendNotification({
        userId: proposal.userId,
        templateId: 'proposal_sent',
        variables: {
          proposalNumber: proposal.proposalNumber,
          capacity: proposal.capacityRequirement,
          tariff: proposal.estimatedTariff
        },
        type: 'email'
      });
    }

    res.status(201).json(proposal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get current user's proposals (both consumer and producer)
// @route   GET /api/proposals/my
// @access  Private
const getMyProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({
      $or: [
        { userId: req.user._id },
        { producerId: req.user._id }
      ]
    })
      .populate('userId', 'firstName lastName email companyName phone')
      .populate('producerId', 'firstName lastName email companyName phone')
      .populate('opportunity')
      .sort({ createdAt: -1 });

    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all proposals (Admin only)
// @route   GET /api/proposals
// @access  Private/Admin
const getProposals = async (req, res) => {
  try {
    const proposals = await Proposal.find({})
      .populate('userId', 'firstName lastName email companyName phone')
      .populate('producerId', 'firstName lastName email companyName phone')
      .populate('opportunity')
      .sort({ createdAt: -1 });

    res.json(proposals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a proposal (status, etc)
// @route   PUT /api/proposals/:id
// @access  Private
const updateProposal = async (req, res) => {
  const { status, amount, notes, validUntil } = req.body;

  try {
    const proposal = await Proposal.findById(req.params.id);
    if (!proposal) {
      return res.status(404).json({ message: 'Proposal not found' });
    }

    // Auth check: Admin, Consumer (userId) or Producer (producerId)
    if (
      proposal.userId.toString() !== req.user._id.toString() &&
      (!proposal.producerId || proposal.producerId.toString() !== req.user._id.toString()) &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const oldStatus = proposal.status;

    if (status) proposal.status = status;
    if (amount !== undefined) proposal.amount = Number(amount);
    if (notes !== undefined) proposal.notes = notes;
    if (validUntil !== undefined) proposal.validUntil = validUntil ? new Date(validUntil) : undefined;

    const updated = await proposal.save();
    await logActivity(req.user._id, 'PROPOSAL_UPDATE', `Updated proposal ${proposal.proposalNumber} status to ${status || oldStatus}`, req);

    // Transaction-based notifications triggers
    if (status && status !== oldStatus) {
      if (status === 'under_review') {
        await sendNotification({
          userId: proposal.userId,
          templateId: 'proposal_sent',
          variables: {
            proposalNumber: proposal.proposalNumber,
            capacity: proposal.capacityRequirement,
            tariff: proposal.estimatedTariff
          },
          type: 'email'
        });
      } else if (status === 'approved') {
        await sendNotification({
          userId: proposal.userId,
          templateId: 'proposal_approved',
          variables: {
            proposalNumber: proposal.proposalNumber
          },
          type: 'email'
        });

        // 1. Auto-draft contract if approved
        const contractNumber = `CON-${Date.now()}`;
        const startDate = new Date();
        const endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + 1); // 1 Year default duration

        const contract = await Contract.create({
          contractNumber,
          proposal: proposal._id,
          consumer: proposal.userId,
          producer: proposal.producerId,
          startDate,
          endDate,
          status: 'pending_signature' // Start directly in pending signatures to prompt actions
        });

        await logActivity(req.user._id, 'CONTRACT_DRAFT_AUTO', `Auto-drafted contract ${contractNumber} from approved proposal`, req);

        // 2. Notify both consumer and producer of pending contract signatures
        await sendNotification({
          userId: proposal.userId,
          templateId: 'contract_pending_signature',
          variables: {
            contractNumber
          },
          type: 'email'
        });

        if (proposal.producerId) {
          await sendNotification({
            userId: proposal.producerId,
            templateId: 'contract_pending_signature',
            variables: {
              contractNumber
            },
            type: 'email'
          });
        }
      } else if (status === 'rejected') {
        await sendNotification({
          userId: proposal.userId,
          templateId: 'proposal_rejected',
          variables: {
            proposalNumber: proposal.proposalNumber
          },
          type: 'email'
        });
      }
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createProposal,
  getMyProposals,
  getProposals,
  updateProposal
};
