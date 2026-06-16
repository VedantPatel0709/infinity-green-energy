const User = require('../models/User');
const Consultation = require('../models/Consultation');
const EnergyAssessment = require('../models/EnergyAssessment');
const EnergyListing = require('../models/EnergyListing');
const Opportunity = require('../models/Opportunity');
const Proposal = require('../models/Proposal');
const Contract = require('../models/Contract');

/**
 * Get Executive Business Intelligence & Analytics Report
 * GET /api/analytics
 */
exports.getBIReport = async (req, res) => {
  try {
    // 1. Get raw counts across all key collections
    const [
      totalUsers,
      totalConsumers,
      totalProducers,
      totalConsultations,
      totalAssessments,
      totalListings,
      totalOpportunities,
      totalProposals,
      totalContracts
    ] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: 'consumer' }),
      User.countDocuments({ role: 'producer' }),
      Consultation.countDocuments(),
      EnergyAssessment.countDocuments(),
      EnergyListing.countDocuments(),
      Opportunity.countDocuments(),
      Proposal.countDocuments(),
      Contract.countDocuments()
    ]);

    // 2. Calculate Revenue Metrics
    // Approved proposal amounts represent closed-won sales pipelines
    const revenueAgg = await Proposal.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;

    const pipelineAgg = await Proposal.aggregate([
      { $match: { status: { $in: ['under_review', 'draft'] } } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const pipelineRevenue = pipelineAgg.length > 0 ? pipelineAgg[0].total : 0;

    // 3. Status Distributions
    const consultationStatus = await Consultation.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const assessmentStatus = await EnergyAssessment.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const opportunityStatus = await Opportunity.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const proposalStatus = await Proposal.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const contractStatus = await Contract.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    // 4. Marketplace Analytics (Capacities and Surcharges)
    const marketplaceStats = await EnergyListing.aggregate([
      {
        $group: {
          _id: null,
          totalCapacity: { $sum: '$capacityAvailable' },
          avgTariff: { $avg: '$tariff' },
          maxTariff: { $max: '$tariff' },
          minTariff: { $min: '$tariff' }
        }
      }
    ]);
    const marketMetrics = marketplaceStats.length > 0 ? marketplaceStats[0] : {
      totalCapacity: 0,
      avgTariff: 0,
      maxTariff: 0,
      minTariff: 0
    };

    // 5. Monthly Trends (Signups, Proposals, and Revenue over the past 6 months)
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
    sixMonthsAgo.setDate(1);
    sixMonthsAgo.setHours(0, 0, 0, 0);

    const monthlyUsersTrend = await User.aggregate([
      { $match: { createdAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    const monthlyRevenueTrend = await Proposal.aggregate([
      { $match: { status: 'approved', updatedAt: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: {
            year: { $year: '$updatedAt' },
            month: { $month: '$updatedAt' }
          },
          revenue: { $sum: '$amount' }
        }
      },
      { $sort: { '_id.year': 1, '_id.month': 1 } }
    ]);

    // Format monthly data into uniform array
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const trendReports = [];

    for (let i = 0; i < 6; i++) {
      const d = new Date();
      d.setMonth(d.getMonth() - 5 + i);
      const targetYear = d.getFullYear();
      const targetMonth = d.getMonth() + 1;

      const userMatch = monthlyUsersTrend.find(t => t._id.year === targetYear && t._id.month === targetMonth);
      const revMatch = monthlyRevenueTrend.find(t => t._id.year === targetYear && t._id.month === targetMonth);

      trendReports.push({
        label: `${monthNames[targetMonth - 1]} ${targetYear}`,
        newUsers: userMatch ? userMatch.count : 0,
        revenue: revMatch ? revMatch.revenue : 0
      });
    }

    // Response packet
    res.json({
      success: true,
      executiveSummary: {
        totalUsers,
        totalConsumers,
        totalProducers,
        totalConsultations,
        totalAssessments,
        totalListings,
        totalOpportunities,
        totalProposals,
        totalContracts,
        totalRevenue,
        pipelineRevenue
      },
      kpiBreakdowns: {
        consultations: consultationStatus.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {}),
        assessments: assessmentStatus.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {}),
        opportunities: opportunityStatus.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {}),
        proposals: proposalStatus.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {}),
        contracts: contractStatus.reduce((acc, curr) => ({ ...acc, [curr._id]: curr.count }), {})
      },
      marketplace: {
        totalAvailableCapacity: marketMetrics.totalCapacity,
        averageListingTariff: marketMetrics.avgTariff ? Number(marketMetrics.avgTariff.toFixed(2)) : 0,
        maxTariff: marketMetrics.maxTariff || 0,
        minTariff: marketMetrics.minTariff || 0
      },
      trendReports
    });

  } catch (error) {
    console.error('BI Generation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to compile Business Intelligence metrics',
      error: error.message
    });
  }
};
