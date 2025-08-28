const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  birthDate: Date,
  email: String,
  phoneNumber: String,
  department: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Department',
    required: true
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
