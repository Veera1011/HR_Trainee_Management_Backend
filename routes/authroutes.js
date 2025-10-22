const express = require('express');
const authrouter = express.Router(); 
const userController = require('../controller/authController');

authrouter.post('/register', userController.registerUser);
authrouter.post('/login', userController.loginUser);

authrouter.get('/google', userController.googleAuth);
authrouter.get('/google/callback', userController.googleAuthCallback);

module.exports = authrouter; 

































// authrouter.get('/', userController.getAllUsers);
// authrouter.delete('/:id', userController.deleteUser);