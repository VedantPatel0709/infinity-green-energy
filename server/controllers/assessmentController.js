const EnergyAssessment = require('../models/EnergyAssessment');
const runSavingsEngine = require('../utils/savingsEngine');
const logActivity = require('../utils/activityLogger');
const { sendNotification } = require('../utils/notificationService');

// @desc    Create a new energy assessment request
// @route   POST /api/assessments
// @access  Private
const createAssessment = async (req, res) => {
  const { 
    state, 
    industry, 
    monthlyElectricityBill, 
    connectedLoad, 
    energyRequirement, 
    annualConsumption,
    currentTariff,
    operatingHours,
    additionalNotes 
  } = req.body;

  try {
    // Automatically execute Savings Engine on submission
    const generatedReport = runSavingsEngine({
      connectedLoad: Number(connectedLoad),
      monthlyElectricityBill: Number(monthlyElectricityBill),
      annualConsumption: Number(annualConsumption),
      currentTariff: Number(currentTariff),
      operatingHours: Number(operatingHours)
    });

    const assessment = await EnergyAssessment.create({
      userId: req.user._id,
      state,
      industry,
      monthlyElectricityBill: Number(monthlyElectricityBill),
      connectedLoad: Number(connectedLoad),
      energyRequirement: Number(energyRequirement),
      annualConsumption: Number(annualConsumption) || 0,
      currentTariff: Number(currentTariff) || 0,
      operatingHours: Number(operatingHours) || 0,
      additionalNotes,
      generatedReport,
      status: 'submitted'
    });

    await logActivity(req.user._id, 'ASSESSMENT_CREATE', `User submitted energy assessment request for state: ${state}`, req);

    // Event-based notification trigger
    await sendNotification({
      userId: req.user._id,
      templateId: 'assessment_submitted',
      variables: {
        company: req.user.companyName || 'your facility',
        state
      },
      type: 'in_app'
    });

    res.status(201).json(assessment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get logged in user's energy assessments
// @route   GET /api/assessments/my
// @access  Private
const getMyAssessments = async (req, res) => {
  try {
    const assessments = await EnergyAssessment.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all energy assessments
// @route   GET /api/assessments
// @access  Private/Admin
const getAssessments = async (req, res) => {
  try {
    const assessments = await EnergyAssessment.find({})
      .populate('userId', 'firstName lastName email companyName phone')
      .sort({ createdAt: -1 });
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update energy assessment (status, recommendations, recalculate report)
// @route   PUT /api/assessments/:id
// @access  Private/Admin
const updateAssessment = async (req, res) => {
  const { 
    status, 
    recommendations,
    connectedLoad,
    monthlyElectricityBill,
    annualConsumption,
    currentTariff,
    operatingHours 
  } = req.body;

  try {
    const assessment = await EnergyAssessment.findById(req.params.id);
    if (!assessment) {
      return res.status(404).json({ message: 'Assessment not found' });
    }

    const oldStatus = assessment.status;
    if (status) assessment.status = status;
    if (recommendations !== undefined) assessment.recommendations = recommendations;

    // Recalculate if inputs are modified by admin
    let inputsChanged = false;
    if (connectedLoad !== undefined) { assessment.connectedLoad = Number(connectedLoad); inputsChanged = true; }
    if (monthlyElectricityBill !== undefined) { assessment.monthlyElectricityBill = Number(monthlyElectricityBill); inputsChanged = true; }
    if (annualConsumption !== undefined) { assessment.annualConsumption = Number(annualConsumption); inputsChanged = true; }
    if (currentTariff !== undefined) { assessment.currentTariff = Number(currentTariff); inputsChanged = true; }
    if (operatingHours !== undefined) { assessment.operatingHours = Number(operatingHours); inputsChanged = true; }

    if (inputsChanged) {
      assessment.generatedReport = runSavingsEngine({
        connectedLoad: assessment.connectedLoad,
        monthlyElectricityBill: assessment.monthlyElectricityBill,
        annualConsumption: assessment.annualConsumption,
        currentTariff: assessment.currentTariff,
        operatingHours: assessment.operatingHours
      });
    }

    const updated = await assessment.save();
    await logActivity(req.user._id, 'ASSESSMENT_UPDATE', `Admin updated assessment status to ${status || assessment.status}`, req);

    // Event-based notification trigger for Report Readiness
    if (status && status !== oldStatus && ['report_ready', 'completed'].includes(status)) {
      await sendNotification({
        userId: assessment.userId,
        templateId: 'assessment_report_ready',
        variables: {
          solution: updated.generatedReport.suggestedSolution,
          savings: updated.generatedReport.estimatedSavings
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
  createAssessment,
  getMyAssessments,
  getAssessments,
  updateAssessment
};
