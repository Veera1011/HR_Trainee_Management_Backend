const express = require('express');
const router = express.Router();
const traineeController = require('../controller/traineeController');

router.post('/', traineeController.createTrainee);
router.post('/bulk', traineeController.createMultipleTrainees);
router.get('/', traineeController.getAllTrainees);
router.get('/dashboard', traineeController.getDashboardMetrics);
router.get('/status/:status', traineeController.getTraineesByStatus);
router.get('/:id', traineeController.getTraineeById);
router.put('/:id', traineeController.updateTrainee);
router.delete('/:id', traineeController.deleteTrainee);

module.exports = router;