const express = require('express');
const router = express.Router();
const axios = require('axios');
const API_BASE_URL = process.env.REACT_APP_BASE_URL;


router.post('/initiate', async (req, res) => {
  const { practitionerId, fee } = req.body;

  try {
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email: 'user@example.com', // Replace with user's email
        amount: fee * 100, // Paystack requires amount in kobo
        callback_url: `${API_BASE_URL}/chat`,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    res.json({ paymentUrl: response.data.data.authorization_url });
  } catch (error) {
    console.error('Paystack Error:', error.response?.data || error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

module.exports = router;
