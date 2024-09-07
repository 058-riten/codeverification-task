const mongoose = require('mongoose');

const verificationCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    length: 6,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: '10m',
  }
});

const VerificationCode = mongoose.model('VerificationCode', verificationCodeSchema);

module.exports = VerificationCode;
