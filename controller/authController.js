const User = require('../models/user');

const jwt = require('jsonwebtoken');
const passport = require('passport');



const registerUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
 
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists'
            });
        }

        const user = new User({ email, password });
        const savedUser = await user.save();
        
        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            data: { id: savedUser._id, email: savedUser.email }
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Error registering user',
            error: error.message
        });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

       
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: { id: user._id, email: user.email }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error logging in',
            error: error.message
        });
    }
};


const googleAuth = (req, res, next) => {
  passport.authenticate('google', { 
    scope: ['profile', 'email'] 
  })(req, res, next);
};

const googleAuthCallback = (req, res, next) => {
  passport.authenticate('google', { 
    failureRedirect: '/login',
    session: false 
  }, (err, user) => {
    if (err || !user) {
      return res.redirect('http://localhost:4200?error=auth_failed');
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );
    
    // Redirect to Angular app with token
    res.redirect(`http://localhost:4200/auth/callback?token=${token}&email=${user.email}`);
  })(req, res, next);
};


module.exports={
    registerUser,loginUser,googleAuth,googleAuthCallback

}






























// exports.getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find().select('-password');
//         res.status(200).json({
//             success: true,
//             count: users.length,
//             data: users
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching users',
//             error: error.message
//         });
//     }
// };


// exports.deleteUser = async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id);
//         if (!user) {
//             return res.status(404).json({
//                 success: false,
//                 message: 'User not found'
//             });
//         }
//         res.status(200).json({
//             success: true,
//             message: 'User deleted successfully'
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error deleting user',
//             error: error.message
//         });
//     }
// };