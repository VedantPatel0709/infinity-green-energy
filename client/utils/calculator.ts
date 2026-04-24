/**
 * Calculator Utility - Logic for energy savings and ROI
 */

/**
 * Calculates estimated annual savings based on monthly consumption
 * @param consumption - Monthly electricity consumption in kWh
 * @returns Estimated annual savings in currency
 */
export const calculateSavings = (consumption: number): number => {
  const avgRatePerUnit = 8; // Example rate
  const annualConsumption = consumption * 12;
  const estimatedSolarOutput = annualConsumption * 0.8; // Example efficiency
  return estimatedSolarOutput * avgRatePerUnit;
};
