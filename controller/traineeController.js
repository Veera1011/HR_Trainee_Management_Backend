const Trainee = require('../models/trainees');
const Employee = require('../models/Employee');
const Training = require('../models/training');

const generateTraineeId = async () => {
  const lastTrainee = await Trainee.findOne().sort({ createdAt: -1 });
  if (!lastTrainee) return 'TRN001';
  
  const lastId = parseInt(lastTrainee.traineeId.replace('TRN', ''));
  return `TRN${String(lastId + 1).padStart(3, '0')}`;
};

exports.createTrainee = async (req, res) => {
  try {
    const traineeId = await generateTraineeId();
    const trainee = new Trainee({ ...req.body, traineeId });
    const savedTrainee = await trainee.save();
    
    const populatedTrainee = await Trainee.findById(savedTrainee._id)
      .populate('employeeId', 'employeeId employeeName email')
      .populate('trainingCode', 'trainingCode trainingName stack');
    
    res.status(201).json({
      success: true,
      message: 'Trainee created successfully',
      data: populatedTrainee
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Duplicate entry: This employee is already enrolled in this training for the same start date',
        error: error.message
      });
    }
    res.status(400).json({
      success: false,
      message: 'Error creating trainee',
      error: error.message
    });
  }
};

exports.createMultipleTrainees = async (req, res) => {
  try {
    const traineesData = req.body.trainees;
    
    console.log('Received trainees data:', JSON.stringify(traineesData, null, 2));
    
    if (!Array.isArray(traineesData) || traineesData.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an array of trainees'
      });
    }

    const results = {
      success: [],
      failed: []
    };

    for (const traineeData of traineesData) {
      try {
        console.log('Processing trainee:', traineeData);
        
        // Verify employee exists
        const employee = await Employee.findOne({ employeeId: traineeData.employeeId });
        if (!employee) {
          results.failed.push({
            data: traineeData,
            reason: `Employee ${traineeData.employeeId} not found`
          });
          continue;
        }

        // Verify training exists
        const training = await Training.findOne({ trainingCode: traineeData.trainingCode });
        if (!training) {
          results.failed.push({
            data: traineeData,
            reason: `Training ${traineeData.trainingCode} not found`
          });
          continue;
        }

        // Parse the date from the string format (YYYY-MM-DD)
        const startDate = new Date(traineeData.startDate);
        startDate.setHours(0, 0, 0, 0); // Normalize to midnight

        console.log('Checking for duplicates with:', {
          employeeId: traineeData.employeeId,
          trainingCode: traineeData.trainingCode,
          startDate: startDate
        });

        // Check for duplicates with date range to avoid time comparison issues
        const startOfDay = new Date(startDate);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(startDate);
        endOfDay.setHours(23, 59, 59, 999);

        const existingTrainee = await Trainee.findOne({
          employeeId: traineeData.employeeId,
          trainingCode: traineeData.trainingCode,
          startDate: {
            $gte: startOfDay,
            $lte: endOfDay
          }
        });

        if (existingTrainee) {
          console.log('Duplicate found:', existingTrainee.traineeId);
          results.failed.push({
            data: traineeData,
            reason: 'Duplicate: Already enrolled in this training on this date'
          });
          continue;
        }

        // Generate trainee ID
        const traineeId = await generateTraineeId();
        
        // Prepare trainee object
        const newTraineeData = {
          traineeId,
          employeeId: traineeData.employeeId,
          trainingCode: traineeData.trainingCode,
          startDate: startDate,
          status: traineeData.status || 'Pending',
          completionPercentage: traineeData.completionPercentage || 0,
          remarks: traineeData.remarks || ''
        };

        // Add endDate if provided
        if (traineeData.endDate) {
          const endDate = new Date(traineeData.endDate);
          endDate.setHours(0, 0, 0, 0);
          newTraineeData.endDate = endDate;
        }

        console.log('Creating trainee with data:', newTraineeData);

        const trainee = new Trainee(newTraineeData);
        const savedTrainee = await trainee.save();
        
        const populatedTrainee = await Trainee.findById(savedTrainee._id)
          .populate('employeeId', 'employeeId employeeName email')
          .populate('trainingCode', 'trainingCode trainingName stack');
        
        console.log('Successfully created trainee:', populatedTrainee.traineeId);
        results.success.push(populatedTrainee);
      } catch (error) {
        console.error('Error creating trainee:', error);
        results.failed.push({
          data: traineeData,
          reason: error.message
        });
      }
    }

    console.log('Final results:', {
      successCount: results.success.length,
      failedCount: results.failed.length
    });

    res.status(201).json({
      success: true,
      message: `Created ${results.success.length} trainees, ${results.failed.length} failed`,
      data: results
    });
  } catch (error) {
    console.error('Error in createMultipleTrainees:', error);
    res.status(400).json({
      success: false,
      message: 'Error creating trainees',
      error: error.message
    });
  }
};

exports.getAllTrainees = async (req, res) => {
  try {
    const trainees = await Trainee.find()
      .populate('employeeId', 'employeeId employeeName email department')
      .populate('trainingCode', 'trainingCode trainingName stack duration')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: trainees.length,
      data: trainees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trainees',
      error: error.message
    });
  }
};

exports.getTraineeById = async (req, res) => {
  try {
    const trainee = await Trainee.findOne({ traineeId: req.params.id })
      .populate('employeeId', 'employeeId employeeName email')
      .populate('trainingCode', 'trainingCode trainingName stack');
    
    if (!trainee) {
      return res.status(404).json({
        success: false,
        message: 'Trainee not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: trainee
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trainee',
      error: error.message
    });
  }
};

exports.updateTrainee = async (req, res) => {
  try {
    const trainee = await Trainee.findOneAndUpdate(
      { traineeId: req.params.id },
      req.body,
      { new: true, runValidators: true }
    )
      .populate('employeeId', 'employeeId employeeName email')
      .populate('trainingCode', 'trainingCode trainingName stack');
    
    if (!trainee) {
      return res.status(404).json({
        success: false,
        message: 'Trainee not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Trainee updated successfully',
      data: trainee
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating trainee',
      error: error.message
    });
  }
};

exports.deleteTrainee = async (req, res) => {
  try {
    const trainee = await Trainee.findOneAndDelete({ traineeId: req.params.id });
    
    if (!trainee) {
      return res.status(404).json({
        success: false,
        message: 'Trainee not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Trainee deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting trainee',
      error: error.message
    });
  }
};

exports.getTraineesByStatus = async (req, res) => {
  try {
    const trainees = await Trainee.find({ status: req.params.status })
      .populate('employeeId', 'employeeId employeeName')
      .populate('trainingCode', 'trainingCode trainingName stack');
    
    res.status(200).json({
      success: true,
      count: trainees.length,
      data: trainees
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching trainees',
      error: error.message
    });
  }
};

exports.getDashboardMetrics = async (req, res) => {
  try {
    const totalTrainees = await Trainee.countDocuments();
    const pendingCount = await Trainee.countDocuments({ status: 'Pending' });
    const ongoingCount = await Trainee.countDocuments({ status: 'Ongoing' });
    const completedCount = await Trainee.countDocuments({ status: 'Completed' });
    
    const stackDistribution = await Trainee.aggregate([
      {
        $lookup: {
          from: 'trainings',
          localField: 'trainingCode',
          foreignField: 'trainingCode',
          as: 'training'
        }
      },
      { $unwind: '$training' },
      {
        $group: {
          _id: '$training.stack',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const topTrainings = await Trainee.aggregate([
      {
        $group: {
          _id: '$trainingCode',
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: 'trainings',
          localField: '_id',
          foreignField: 'trainingCode',
          as: 'training'
        }
      },
      { $unwind: '$training' },
      {
        $project: {
          trainingName: '$training.trainingName',
          stack: '$training.stack',
          count: 1
        }
      },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);
    
    const recentTrainees = await Trainee.find()
      .populate('employeeId', 'employeeId employeeName')
      .populate('trainingCode', 'trainingCode trainingName stack')
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.status(200).json({
      success: true,
      data: {
        summary: {
          total: totalTrainees,
          pending: pendingCount,
          ongoing: ongoingCount,
          completed: completedCount
        },
        stackDistribution,
        topTrainings,
        recentTrainees
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard metrics',
      error: error.message
    });
  }
};