const mongoose = require('mongoose');

const traineeSchema = mongoose.Schema({
  traineeId: {
    type: String,
    required: true,
    unique: true
  },
  employeeId: {
    type: String,
    ref: 'Employee',
    required: true
  },
  trainingCode: {
    type: String,
    ref: 'Training',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['Completed', 'Pending', 'Ongoing'],
    default: 'Pending'
  },
  completionPercentage: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  remarks: String
}, { timestamps: true });


traineeSchema.index({ employeeId: 1, trainingCode: 1, startDate: 1 }, { unique: true });

module.exports = mongoose.model('Trainee', traineeSchema);