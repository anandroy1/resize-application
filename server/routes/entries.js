// routes/entries.js
const express = require('express');
const router = express.Router();
const entries = require('../utils/entries');

router.get('/', (req, res) => {
  res.json(entries.getEntries());
});

module.exports = router;
