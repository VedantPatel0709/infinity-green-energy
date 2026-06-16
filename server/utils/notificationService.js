const Notification = require('../models/Notification');
const User = require('../models/User');

// Predefined B2B transactional notification templates
const TEMPLATES = {
  consultation_created: {
    title: 'Consultation Request Registered',
    message: (vars) => `Hello ${vars.name || 'Client'}, your consultation request for ${vars.company || 'your facility'} has been received. An energy engineer will contact you shortly.`
  },
  consultation_scheduled: {
    title: 'Consultation Site Audit Scheduled',
    message: (vars) => `Hello ${vars.name || 'Client'}, your Site Audit has been scheduled on ${vars.date} with inspector ${vars.inspector}.`
  },
  assessment_submitted: {
    title: 'Energy Feasibility Study Initiated',
    message: (vars) => `An energy assessment load profile study has been submitted for ${vars.company || 'your facility'} in ${vars.state}.`
  },
  assessment_report_ready: {
    title: 'Feasibility Report Generated',
    message: (vars) => `Congratulations! The energy savings report is ready for review. Suggested solution: ${vars.solution}. Est Savings: ₹${vars.savings?.toLocaleString('en-IN')}/year.`
  },
  opportunity_matched: {
    title: 'Marketplace Opportunity Match Established',
    message: (vars) => `An opportunity match has been created between Consumer ${vars.consumer} and Producer ${vars.producer} for capacity of ${vars.capacity} MW.`
  },
  proposal_sent: {
    title: 'Power Purchase Proposal Dispatched',
    message: (vars) => `A proposal draft (${vars.proposalNumber}) has been issued for your review. Proposed Capacity: ${vars.capacity}, Estimated Tariff: ₹${vars.tariff}/unit.`
  },
  proposal_approved: {
    title: 'Proposal Approved & Confirmed',
    message: (vars) => `Great news! The PPA Proposal (${vars.proposalNumber}) has been approved. Draft contract is being generated.`
  },
  proposal_rejected: {
    title: 'Proposal Rejected',
    message: (vars) => `The proposal (${vars.proposalNumber}) was marked as rejected. Terms will be updated by administrative staff.`
  },
  contract_pending_signature: {
    title: 'PPA Contract Pending Signatures',
    message: (vars) => `The formal power purchase contract (${vars.contractNumber}) is ready and requires your digital signature to activate.`
  },
  contract_active: {
    title: 'Green PPA Contract Active',
    message: (vars) => `Success! The PPA contract (${vars.contractNumber}) has been signed by both parties and is now ACTIVE.`
  }
};

/**
 * Dispatch transactional/marketing notifications across multiple channels
 * @param {Object} params
 * @param {string} params.userId - Recipient User ID
 * @param {string} params.templateId - Template Identifier from list
 * @param {Object} params.variables - Values to substitute in template
 * @param {string} [params.customTitle] - Custom title override
 * @param {string} [params.customMessage] - Custom message override
 * @param {string} [params.type] - 'email' | 'sms' | 'in_app' | 'broadcast'
 * @param {Object} [params.metadata] - Dynamic references (e.g. proposalId)
 */
exports.sendNotification = async ({
  userId,
  templateId,
  variables = {},
  customTitle,
  customMessage,
  type = 'in_app',
  metadata = {}
}) => {
  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    let title = customTitle || '';
    let message = customMessage || '';

    // Render templates if templateId exists
    if (templateId && TEMPLATES[templateId]) {
      title = customTitle || TEMPLATES[templateId].title;
      message = customMessage || TEMPLATES[templateId].message(variables);
    }

    // Determine recipient text based on channel
    let recipient = user.email;
    if (type === 'sms') {
      recipient = user.phone || 'No phone number registered';
    }

    // Attempt mock delivery simulations
    let status = 'sent';
    let error = null;

    if (type === 'email') {
      console.log(`✉️ Sending Email to ${recipient} [Title: ${title}]: "${message}"`);
      // Simulating a minor network glitch example (1% chance)
      if (!recipient || !recipient.includes('@')) {
        status = 'failed';
        error = 'Invalid email address syntax';
      }
    } else if (type === 'sms') {
      console.log(`📱 Sending SMS to ${recipient}: "${message}"`);
      if (recipient === 'No phone number registered') {
        status = 'failed';
        error = 'Missing recipient mobile number';
      }
    } else {
      console.log(`🔔 Internal Notification for User ${user.email}: "${message}"`);
    }

    // Log the notification to database
    const notification = await Notification.create({
      userId,
      title,
      message,
      read: false,
      type,
      status,
      recipient,
      templateId: templateId || 'custom',
      metadata,
      deliveryLog: [
        {
          attempt: 1,
          error,
          sentAt: new Date()
        }
      ]
    });

    return notification;

  } catch (error) {
    console.error('Notification dispatch error:', error);
    return null;
  }
};
