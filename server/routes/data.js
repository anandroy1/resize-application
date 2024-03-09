// routes/data.js
const express = require('express');
const Data = require('../models/data'); // Ensure this path is correct
const validation = require('../utils/validation');

const router = express.Router();

router.post('/', async (req, res) => {
  const { action, newData } = req.body;

  // Validate newData
  if (!validation.isValidData(newData)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  try {
    if (action === 'add') {
      // Insert new data into the database
      await Data.create(newData);
    } else if (action === 'update') {
      // Update all documents in the database
      await Data.updateMany({}, newData);
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Error in data API:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
