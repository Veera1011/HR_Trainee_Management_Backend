const Training = require('../models/training');

exports.createTraining = async (req, res) => {
  try {
    const training = new Training(req.body);
    const savedTraining = await training.save();
    
    res.status(201).json({
      success: true,
      message: 'Training created successfully',
      data: savedTraining
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating training',
      error: error.message
    });
  }
};

exports.getAllTrainings = async (req, res) => {
  try {
    const trainings = await Training.find({ isActive: true }).sort({ stack: 1, trainingName: 1 });
    res.status(200).json({
      success: true,
      count: trainings.length,
      data: trainings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trainings',
      error: error.message
    });
  }
};

exports.getTrainingsByStack = async (req, res) => {
  try {
    const trainings = await Training.find({ 
      stack: req.params.stack, 
      isActive: true 
    }).sort({ trainingName: 1 });
    
    res.status(200).json({
      success: true,
      count: trainings.length,
      data: trainings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trainings',
      error: error.message
    });
  }
};

exports.updateTraining = async (req, res) => {
  try {
    const training = await Training.findOneAndUpdate(
      { trainingCode: req.params.code },
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!training) {
      return res.status(404).json({
        success: false,
        message: 'Training not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Training updated successfully',
      data: training
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating training',
      error: error.message
    });
  }
};

exports.deleteTraining = async (req, res) => {
  try {
    const training = await Training.findOneAndUpdate(
      { trainingCode: req.params.code },
      { isActive: false },
      { new: true }
    );
    
    if (!training) {
      return res.status(404).json({
        success: false,
        message: 'Training not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Training deactivated successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting training',
      error: error.message
    });
  }
};

// Seed initial training data
exports.seedTrainings = async (req, res) => {
  try {
    const trainings = [
      { trainingCode: 'MEAN001', trainingName: 'Angular Fundamentals', stack: 'MEAN', duration: 30 },
      { trainingCode: 'MEAN002', trainingName: 'Node.js & Express', stack: 'MEAN', duration: 25 },
      { trainingCode: 'MEAN003', trainingName: 'MongoDB', stack: 'MEAN', duration: 20 },
      { trainingCode: 'SAP001', trainingName: 'SAP ABAP', stack: 'SAP', duration: 45 },
      { trainingCode: 'SAP002', trainingName: 'SAP FICO', stack: 'SAP', duration: 40 },
      { trainingCode: 'CBP001', trainingName: 'Core Banking Platform', stack: 'CBP', duration: 50 },
      { trainingCode: 'FUNC001', trainingName: 'Business Analysis', stack: 'Functional', duration: 30 },
      { trainingCode: 'FUNC002', trainingName: 'Project Management', stack: 'Functional', duration: 25 }
    ];

    await Training.insertMany(trainings);
    
    res.status(201).json({
      success: true,
      message: 'Training data seeded successfully',
      data: trainings
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error seeding trainings',
      error: error.message
    });
  }
};