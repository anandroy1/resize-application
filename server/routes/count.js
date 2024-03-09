// routes/count.js
const express = require('express');
const router = express.Router();
const count = require('../utils/count');

router.get('/', (req, res) => {
  res.json(count.getCount());
});

module.exports = router;
