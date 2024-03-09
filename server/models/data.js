// models/data.js
const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
  width: Number,
  height: Number,
});

const Data = mongoose.model('Data', dataSchema);

module.exports = Data;
