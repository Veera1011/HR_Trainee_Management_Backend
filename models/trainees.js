const mongoose = require('mongoose');

const traineeschema = mongoose.Schema({
    EmployeeName: { type: String, required: true },
    TrainingName: { 
        type: String, 
        enum: ['Angular', 'Node js', 'Express js', 'MongoDB'], 
        required: true 
    },
    StartDate: { type: Date, required: true },
    EndDate: { type: Date },
    Status: { 
        type: String, 
        enum: ['Completed', 'Pending', 'Ongoing'], 
        default: 'Pending' 
    }
}, { timestamps: true });

module.exports = mongoose.model('Trainee', traineeschema);