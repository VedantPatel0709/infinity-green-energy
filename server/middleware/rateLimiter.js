const logActivity = require('../utils/activityLogger');

// Simple in-memory rate limiting store
const rateLimitStore = {};

const RATE_WINDOW_MS = 15 * 60 * 1000; // 15 Minutes
const MAX_REQUESTS = 300; // limit each IP to 300 requests per window

/**
 * Custom Rate Limiter Middleware
 */
const rateLimiter = async (req, res, next) => {
  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown-ip';

  // Exclude local dev if needed, or monitor all
  const now = Date.now();

  if (!rateLimitStore[ip]) {
    rateLimitStore[ip] = {
      requests: 1,
      windowStart: now
    };
    return next();
  }

  const record = rateLimitStore[ip];

  // If window has expired, reset counter
  if (now - record.windowStart > RATE_WINDOW_MS) {
    record.requests = 1;
    record.windowStart = now;
    return next();
  }

  record.requests += 1;

  if (record.requests > MAX_REQUESTS) {
    // Log violation to Audit Logs
    await logActivity(
      null, 
      'RATE_LIMIT_EXCEEDED', 
      `IP address ${ip} blocked due to rate limit violation (${record.requests} requests in window)`, 
      req
    );

    return res.status(429).json({
      success: false,
      message: 'Too many requests from this IP. Please try again after 15 minutes.'
    });
  }

  next();
};

module.exports = rateLimiter;
