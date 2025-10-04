const Trainee = require('../models/trainees');


exports.createTrainee = async (req, res) => {
    try {
        const trainee = new Trainee(req.body);
        const savedTrainee = await trainee.save();
        res.status(201).json({
            success: true,
            message: 'Trainee created successfully',
            data: savedTrainee
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error creating trainee',
            error: error.message
        });
    }
};


exports.getAllTrainees = async (req, res) => {
    try {
        const trainees = await Trainee.find();
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
        const trainee = await Trainee.findById(req.params.id);
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
        const trainee = await Trainee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
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
        const trainee = await Trainee.findByIdAndDelete(req.params.id);
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
exports.deleteTraineebyName = async (req, res) => {
    try {
        const trainee = await Trainee.findOneAndDelete({ EmployeeName: req.params.name });
        
        if (!trainee) {
            return res.status(404).json({
                success: false,
                message: 'Trainee not found'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Trainee deleted successfully',
            data: trainee
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
        const { status } = req.params;
        const trainees = await Trainee.find({ Status: status });
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























// .sort({ EmployeeName: 1 })