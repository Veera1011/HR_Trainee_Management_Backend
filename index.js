const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth=require('./routes/authroutes');
const trainee=require('./routes/traineeroutes')
require('dotenv').config();

const app = express();


app.use(cors());
app.use(express.json());



mongoose.connect(process.env.MONGO_URI , {
})



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