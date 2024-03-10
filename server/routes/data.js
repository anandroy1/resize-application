// routes/data.js
const express = require('express');
const router = express.Router();

// In-memory storage for added data and entries
let addedData = [];
let entries = [];

router.post('/', (req, res) => {
  const { action, newData } = req.body;

  // Simple validation: Check if newData is not empty
  if (!newData || (typeof newData !== 'object' && !newData.data)) {
    return res.status(400).json({ error: 'Invalid data format' });
  }

  if (action === 'add') {
    // Store new data in the array
    addedData.push(newData);

    // Store each entry separately
    entries.push(newData.data);
  } else if (action === 'update') {
    // Update the existing data in the array (you can modify this part based on your data source)
    addedData[0] = newData;

    // Update the first entry with the updated data
    entries[0] = newData.data;
  }

  res.json({ success: true });
});

router.get('/entries', (req, res) => {
  // Send the entries array in the response
  res.json(entries);
});

module.exports = router;
