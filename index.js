const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth=require('./routes/authroutes');
const trainee=require('./routes/traineeroutes')
require('dotenv').config();
const session = require('express-session');
const passport = require('./config/passport');


const app = express();


app.use(cors({
  origin: 'http://localhost:4200',
  credentials: true
}));
app.use(express.json());



mongoose.connect(process.env.MONGO_URI , {
})

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

app.use('/trainees', trainee );
app.use('/auth', auth);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


























































// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({
//         success: false,
//         message: 'Something went wrong!',
//         error: err.message
//     });
// });

//app.use(express.urlencoded({ extended: true }));
// app.get('/', (req, res) => {
//     res.json({
//         message: 'HR Trainees Management API',
//         endpoints: {
//             trainees: '/api/trainees',
//             users: '/api/users'
//         }
//     });
// });