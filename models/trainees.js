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

// Create compound index for uniqueness
traineeSchema.index({ employeeId: 1, trainingCode: 1, startDate: 1 }, { unique: true });

// Pre-save middleware to ensure proper references
traineeSchema.pre('save', async function(next) {
  // Ensure employeeId is stored as string employeeId, not ObjectId
  if (this.isModified('employeeId')) {
    const Employee = mongoose.model('Employee');
    const employee = await Employee.findOne({ employeeId: this.employeeId });
    if (!employee) {
      throw new Error('Employee not found');
    }
    this.employeeId = employee.employeeId;
  }

  // Ensure trainingCode is stored as string trainingCode
  if (this.isModified('trainingCode')) {
    const Training = mongoose.model('Training');
    const training = await Training.findOne({ trainingCode: this.trainingCode });
    if (!training) {
      throw new Error('Training not found');
    }
    this.trainingCode = training.trainingCode;
  }

  next();
});

module.exports = mongoose.model('Trainee', traineeSchema);