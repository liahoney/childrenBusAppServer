// models/BusLocation.js
const mongoose = require('mongoose');

const busLocationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BusLocation', busLocationSchema);
