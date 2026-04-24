const express = require('express');
const router = express.Router();

const { addEnergyData, getUserEnergyData } = require('../controllers/energyController');
const { protect } = require('../middleware/authMiddleware');

// DEBUG (optional)
console.log("addEnergyData:", addEnergyData);
console.log("protect:", protect);

router.post('/', protect, addEnergyData);
router.get('/me', protect, getUserEnergyData);

module.exports = router;