const Contract = require('../models/Contract');
const logActivity = require('../utils/activityLogger');
const { sendNotification } = require('../utils/notificationService');

// @desc    Create a new contract
// @route   POST /api/contracts
// @access  Private/Admin
const createContract = async (req, res) => {
  const { contractNumber, proposal, consumer, producer, startDate, endDate, status, notes } = req.body;

  try {
    const contract = await Contract.create({
      contractNumber: contractNumber || `CON-${Date.now()}`,
      proposal,
      consumer,
      producer,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      status: status || 'draft',
      notes: notes || ''
    });

    await logActivity(req.user._id, 'CONTRACT_CREATE', `Created contract ${contract.contractNumber}`, req);
    res.status(201).json(contract);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all contracts
// @route   GET /api/contracts
// @access  Private/Admin
const getContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({})
      .populate('proposal')
      .populate('consumer', 'firstName lastName email companyName phone')
      .populate('producer', 'firstName lastName email companyName phone')
      .sort({ createdAt: -1 });

    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get current user's contracts
// @route   GET /api/contracts/my
// @access  Private
const getMyContracts = async (req, res) => {
  try {
    const contracts = await Contract.find({
      $or: [
        { consumer: req.user._id },
        { producer: req.user._id }
      ]
    })
      .populate('proposal')
      .populate('consumer', 'firstName lastName email companyName phone')
      .populate('producer', 'firstName lastName email companyName phone')
      .sort({ createdAt: -1 });

    res.json(contracts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a contract status or details
// @route   PUT /api/contracts/:id
// @access  Private
const updateContract = async (req, res) => {
  const { status, startDate, endDate, notes } = req.body;

  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    // Check authorization: Admin, Consumer or Producer
    if (
      contract.consumer.toString() !== req.user._id.toString() &&
      contract.producer.toString() !== req.user._id.toString() &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    if (status) contract.status = status;
    if (startDate) contract.startDate = new Date(startDate);
    if (endDate) contract.endDate = new Date(endDate);
    if (notes !== undefined) contract.notes = notes;

    const updated = await contract.save();
    await logActivity(req.user._id, 'CONTRACT_UPDATE', `Updated contract ${contract.contractNumber} status to ${status || contract.status}`, req);

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Sign a contract
// @route   POST /api/contracts/:id/sign
// @access  Private
const signContract = async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);
    if (!contract) {
      return res.status(404).json({ message: 'Contract not found' });
    }

    const userIdStr = req.user._id.toString();

    let signed = false;
    if (contract.consumer.toString() === userIdStr) {
      contract.signedByConsumer = true;
      signed = true;
    }
    if (contract.producer.toString() === userIdStr) {
      contract.signedByProducer = true;
      signed = true;
    }

    if (!signed && req.user.role !== 'admin') {
      return res.status(401).json({ message: 'Not authorized to sign this contract' });
    }

    const oldStatus = contract.status;

    // If both signed, move to active
    if (contract.signedByConsumer && contract.signedByProducer) {
      contract.status = 'active';
    } else {
      contract.status = 'pending_signature';
    }

    const updated = await contract.save();
    await logActivity(req.user._id, 'CONTRACT_SIGN', `Signed contract ${contract.contractNumber}. Status: ${contract.status}`, req);

    // Dynamic notification trigger on contract activation
    if (contract.status === 'active' && oldStatus !== 'active') {
      await sendNotification({
        userId: contract.consumer,
        templateId: 'contract_active',
        variables: {
          contractNumber: contract.contractNumber
        },
        type: 'email'
      });

      await sendNotification({
        userId: contract.producer,
        templateId: 'contract_active',
        variables: {
          contractNumber: contract.contractNumber
        },
        type: 'email'
      });
    }

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createContract,
  getContracts,
  getMyContracts,
  updateContract,
  signContract
};
