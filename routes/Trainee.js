const express = require('express');
const router = express.Router();
const trainingController = require('../controller/trainingController');

router.post('/', trainingController.createTraining);
router.post('/seed', trainingController.seedTrainings);
router.get('/', trainingController.getAllTrainings);
router.get('/stack/:stack', trainingController.getTrainingsByStack);
router.put('/:code', trainingController.updateTraining);
router.delete('/:code', trainingController.deleteTraining);

module.exports = router;