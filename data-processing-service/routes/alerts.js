// routes/alerts.js

const express = require('express');
const router = express.Router();
const Alert = require('../shared-models/Alert');

// Create Alert
router.post('/', async (req, res) => {
  try {
    const newAlert = new Alert({
      user: req.user,
      ...req.body,
    });
    const alert = await newAlert.save();
    res.json(alert);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Get User Alerts
router.get('/', async (req, res) => {
  try {
    const alerts = await Alert.find({ user: req.user });
    res.json(alerts);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
