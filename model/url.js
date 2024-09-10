const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  shortID: {
    type: String,
    required: true,
    unique: true,
  },
  redirectURL: {
    type: String,
    required: true,
  },
  visitHistory: [{
    timeStamp: { type: Number },
    ipAddress: { type: String },  // To track the IP address
    userAgent: { type: String },  // To track the User-Agent
  }],
  clicks: {
    type: Number,
    default: 0,
  }
}, { timestamps: true });

const URL = mongoose.model("URL", urlSchema);
module.exports = URL;
