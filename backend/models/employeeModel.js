// models/employeeModel.js
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({

  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the User

  siteName: {
    type: String,
    required: true,
  },
  
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: false,
  },
  role: { type: String, default: 'admin' },
  createdAt: { type: Date, default: Date.now },

  
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
