const express = require('express');
const trouter = express.Router(); 
const traineeController = require('../controller/traineeController');

trouter.post('/', traineeController.createTrainee);
trouter.get('/', traineeController.getAllTrainees);
trouter.get('/:id', traineeController.getTraineeById);
trouter.put('/:id', traineeController.updateTrainee);
trouter.delete('/:id', traineeController.deleteTrainee);
trouter.delete('/name/:name', traineeController.deleteTraineebyName);
trouter.get('/status/:status', traineeController.getTraineesByStatus);

module.exports = trouter; 
