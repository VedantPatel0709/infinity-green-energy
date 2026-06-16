const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');

const rateLimiter = require('./middleware/rateLimiter');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(rateLimiter);

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/leads', require('./routes/leadRoutes'));
app.use('/api/energy', require('./routes/energyRoutes'));
app.use('/api/consumers', require('./routes/consumerRoutes'));
app.use('/api/producers', require('./routes/producerRoutes'));
app.use('/api/consultations', require('./routes/consultationRoutes'));
app.use('/api/documents', require('./routes/documentRoutes'));
app.use('/api/notifications', require('./routes/notificationRoutes'));
app.use('/api/assessments', require('./routes/assessmentRoutes'));
app.use('/api/proposals', require('./routes/proposalRoutes'));
app.use('/api/listings', require('./routes/listingRoutes'));
app.use('/api/opportunities', require('./routes/opportunityRoutes'));
app.use('/api/requirements', require('./routes/requirementRoutes'));
app.use('/api/marketplace-opportunities', require('./routes/marketplaceOpportunityRoutes'));
app.use('/api/contracts', require('./routes/contractRoutes'));
app.use('/api/analytics', require('./routes/analyticsRoutes'));
app.use('/api/security', require('./routes/securityRoutes'));

// Root Endpoint
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'Infinity Green Energy API is running',
    version: '1.0.0'
  });
});

// Health Check Endpoint (added)
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK' });
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`❌ Error: ${err.message}`);
  server.close(() => process.exit(1));
});