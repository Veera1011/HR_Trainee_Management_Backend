const mongoose = require('mongoose');

const trainingSchema = new mongoose.Schema({
  trainingCode: {
    type: String,
    required: true,
    unique: true
  },
  trainingName: {
    type: String,
    required: true
  },
  stack: {
    type: String,
    enum: ['MEAN', 'SAP', 'CBP', 'Functional'],
    required: true
  },
  duration: Number, 
  description: String,
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Training', trainingSchema);