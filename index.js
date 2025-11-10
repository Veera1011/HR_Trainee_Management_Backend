const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require('./routes/authroutes');
const trainee = require('./routes/traineeroutes');
const employee = require('./routes/employeeroutes');
const training = require('./routes/Trainee');
require('dotenv').config();
const session = require('express-session');
const passport = require('./config/passport');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {});

app.use(session({
  secret: process.env.SESSION_SECRET || 'your-session-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, 
    maxAge: 24 * 60 * 60 * 1000 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', auth);
app.use('/trainees', trainee);
app.use('/employees', employee);
app.use('/trainings', training);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});