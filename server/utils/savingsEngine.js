/**
 * Savings Engine - green power feasibility algorithm
 * Calculates savings and potentials based on consumer energy parameters.
 */
const runSavingsEngine = (inputs) => {
  const {
    connectedLoad,          // in kW
    monthlyElectricityBill,  // in ₹
    annualConsumption,      // in kWh/year (optional)
    currentTariff,          // in ₹/unit (optional)
    operatingHours          // in hours/day (optional)
  } = inputs;

  // 1. Resolve Tariff (default to ₹8.00 if not provided)
  const tariff = Number(currentTariff) || 8.00;

  // 2. Resolve Annual Consumption (default to monthly bill / tariff * 12)
  let annualKwh = Number(annualConsumption);
  if (!annualKwh || annualKwh === 0) {
    const monthlyKwh = Number(monthlyElectricityBill) / tariff;
    annualKwh = monthlyKwh * 12;
  }

  // 3. Estimated Savings (assuming B2B open-access green tariff is ₹5.50/unit)
  // E.g., Savings = annualConsumption * (currentTariff - greenTariff)
  const greenTariff = 5.50;
  const unitSaving = Math.max(0.5, tariff - greenTariff); // guarantee at least ₹0.50 saving per unit
  const estimatedSavings = Math.round(annualKwh * unitSaving);

  // 4. Open Access Potential
  // E.g., Open Access is viable for connections >= 100 kW
  const loadKw = Number(connectedLoad) || 0;
  let openAccessPotential = 0;
  if (loadKw >= 100) {
    openAccessPotential = Math.round(loadKw * 0.85); // 85% load contract potential
  }

  // 5. Solar Potential (based on connected load rooftops/ground-mount footprint)
  const solarPotential = Math.round(loadKw * 0.65); // 65% load factor sizing recommendation

  // 6. Suggested Solution Classification
  let suggestedSolution = '';
  if (loadKw >= 1000) {
    suggestedSolution = 'Utility-Scale Renewable Open Access (Solar-Wind Hybrid Captive Model)';
  } else if (loadKw >= 100) {
    suggestedSolution = 'Third-Party PPA Open Access (Solar Exchange Swap) + Net-Metered Rooftop Solar';
  } else {
    suggestedSolution = 'On-Grid Rooftop Solar Net Metering (CAPEX/RESCO Model)';
  }

  // 7. Consultation Recommendation
  let consultationRecommendation = '';
  if (loadKw >= 100) {
    consultationRecommendation = 'Highly recommended to assign an Open Access expert for SLDC grid feasibility and wheeling agreement compliance audit.';
  } else {
    consultationRecommendation = 'Recommended for Net-Metering feasibility and structural integrity survey of roof area.';
  }

  return {
    estimatedSavings,
    openAccessPotential,
    solarPotential,
    suggestedSolution,
    consultationRecommendation
  };
};

module.exports = runSavingsEngine;
