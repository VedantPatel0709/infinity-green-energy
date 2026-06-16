const mongoose = require('mongoose');

const energyAssessmentSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    state: {
      type: String,
      required: true,
      trim: true
    },
    industry: {
      type: String,
      required: true,
      trim: true
    },
    monthlyElectricityBill: {
      type: Number,
      required: true,
      default: 0
    },
    connectedLoad: {
      type: Number,
      required: true,
      default: 0
    },
    energyRequirement: {
      type: Number,
      required: true,
      default: 0
    },
    annualConsumption: {
      type: Number,
      default: 0
    },
    currentTariff: {
      type: Number,
      default: 0
    },
    operatingHours: {
      type: Number,
      default: 0
    },
    recommendations: {
      type: String,
      default: '',
      trim: true
    },
    generatedReport: {
      estimatedSavings: { type: Number, default: 0 },
      openAccessPotential: { type: Number, default: 0 },
      solarPotential: { type: Number, default: 0 },
      suggestedSolution: { type: String, default: '' },
      consultationRecommendation: { type: String, default: '' }
    },
    additionalNotes: {
      type: String,
      default: '',
      trim: true
    },
    status: {
      type: String,
      required: true,
      enum: ['submitted', 'under_review', 'report_ready', 'completed'],
      default: 'submitted'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.models.EnergyAssessment || mongoose.model('EnergyAssessment', energyAssessmentSchema);
