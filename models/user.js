const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
  
    required: function() {
      return !this.googleId;
    }
  },
  googleId: {
    type: String,
    sparse: true
  },
  displayName: String,
  picture: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', userSchema);

// const userschema = mongoose.Schema({
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true }
// }, { timestamps: true });

// module.exports = mongoose.model('User', userschema);