const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  roll_no: {
    type: String,
    required: true,
    unique: true,
  },
  name: String,
  admission_number: String,
  date_of_birth: Date,
  gender: String,
  father_name: String,
  mother_name: String,
  nationality: String,
  address: String,
  contact: {
    phone: String,
    email: String,
  }
});

const StudentModel = mongoose.model('Student', StudentSchema);

module.exports = StudentModel;
