// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { chargePayment } = require('../controllers/paymentController');

// POST endpoint to process payment and create order
router.post('/payment/charge', chargePayment);

module.exports = router;
