const Lead = require('../models/Lead');
const logActivity = require('../utils/activityLogger');

// @desc    Register a new lead
// @route   POST /api/leads
// @access  Public
const createLead = async (req, res) => {
  const { name, email, phone, company, bill, message, consultationId, assessmentId } = req.body;

  try {
    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      bill: Number(bill),
      message,
      consultationId: consultationId || undefined,
      assessmentId: assessmentId || undefined,
      status: 'New',
      activities: [
        {
          action: 'Lead Created',
          details: `Lead created from inquiry form. Company: ${company}`,
          performedBy: name
        }
      ]
    });

    res.status(201).json(lead);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all leads
// @route   GET /api/leads
// @access  Private/Admin
const getLeads = async (req, res) => {
  try {
    const leads = await Lead.find({})
      .populate('assignedTo', 'firstName lastName email companyName')
      .populate('consultationId')
      .populate('assessmentId')
      .populate('opportunityId')
      .populate('proposalId')
      .sort({ createdAt: -1 });

    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update a lead (status, follow-up)
// @route   PUT /api/leads/:id
// @access  Private/Admin
const updateLead = async (req, res) => {
  const { name, email, phone, company, bill, message, status, followUpDate, followUpNotes, opportunityId, proposalId } = req.body;

  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    const performer = `${req.user.firstName} ${req.user.lastName}`;
    const oldStatus = lead.status;

    if (name) lead.name = name;
    if (email) lead.email = email;
    if (phone) lead.phone = phone;
    if (company) lead.company = company;
    if (bill !== undefined) lead.bill = Number(bill);
    if (message !== undefined) lead.message = message;
    if (followUpNotes !== undefined) lead.followUpNotes = followUpNotes;
    if (followUpDate !== undefined) lead.followUpDate = followUpDate ? new Date(followUpDate) : undefined;
    if (opportunityId !== undefined) lead.opportunityId = opportunityId || undefined;
    if (proposalId !== undefined) lead.proposalId = proposalId || undefined;

    if (status && status !== oldStatus) {
      lead.status = status;
      lead.activities.push({
        action: 'Stage Changed',
        details: `Deal stage transitioned from ${oldStatus} to ${status}`,
        performedBy: performer
      });
    }

    // Add log for follow-up date changes
    if (followUpDate !== undefined) {
      lead.activities.push({
        action: 'Follow-Up Action Scheduled',
        details: followUpDate ? `Task follow-up scheduled for ${new Date(followUpDate).toLocaleDateString()}` : 'Follow-up date cleared',
        performedBy: performer
      });
    }

    const updated = await lead.save();
    await logActivity(req.user._id, 'LEAD_UPDATE', `Updated lead stage for ${lead.company} to ${lead.status}`, req);

    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Add a timeline note to a lead
// @route   POST /api/leads/:id/notes
// @access  Private/Admin
const addLeadNote = async (req, res) => {
  const { content } = req.body;

  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    const author = `${req.user.firstName} ${req.user.lastName}`;

    lead.notes.push({
      content,
      author
    });

    lead.activities.push({
      action: 'Note Added',
      details: content.length > 50 ? `${content.substring(0, 50)}...` : content,
      performedBy: author
    });

    const updated = await lead.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Assign lead to an admin handler
// @route   POST /api/leads/:id/assign
// @access  Private/Admin
const assignLead = async (req, res) => {
  const { assignedTo } = req.body;

  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      return res.status(404).json({ message: 'Lead not found' });
    }

    lead.assignedTo = assignedTo || undefined;
    const performer = `${req.user.firstName} ${req.user.lastName}`;

    lead.activities.push({
      action: 'Lead Handover',
      details: assignedTo ? 'Lead reassigned to account manager' : 'Lead assignment cleared',
      performedBy: performer
    });

    const updated = await lead.save();
    await updated.populate('assignedTo', 'firstName lastName email companyName');
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get lead pipeline analytics
// @route   GET /api/leads/analytics
// @access  Private/Admin
const getLeadAnalytics = async (req, res) => {
  try {
    const leads = await Lead.find({});
    
    const statusCounts = {
      New: 0,
      Contacted: 0,
      Qualified: 0,
      'Proposal Sent': 0,
      Negotiation: 0,
      Won: 0,
      Lost: 0
    };

    let totalPipelineValue = 0;
    let wonValue = 0;

    leads.forEach((l) => {
      const status = l.status || 'New';
      if (statusCounts[status] !== undefined) {
        statusCounts[status]++;
      }
      const val = l.bill || 0;
      totalPipelineValue += val;
      if (status === 'Won') {
        wonValue += val;
      }
    });

    const totalLeads = leads.length;
    const wonLeads = statusCounts.Won;
    const conversionRate = totalLeads > 0 ? ((wonLeads / totalLeads) * 100).toFixed(1) : 0;

    res.json({
      totalLeads,
      statusBreakdown: statusCounts,
      totalPipelineValue,
      wonValue,
      conversionRate: Number(conversionRate)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLead,
  getLeads,
  updateLead,
  addLeadNote,
  assignLead,
  getLeadAnalytics
};
