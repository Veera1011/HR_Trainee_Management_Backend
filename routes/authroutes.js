const express = require('express');
const authrouter = express.Router(); 
const userController = require('../controller/authController');

authrouter.post('/register', userController.registerUser);
authrouter.post('/login', userController.loginUser);


module.exports = authrouter; 

































// authrouter.get('/', userController.getAllUsers);
// authrouter.delete('/:id', userController.deleteUser);