const mongoose = require ('mongoose');

const studentSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true,
  },
  cgpa: {
    type: mongoose.Types.Decimal128,
    required: true,
  },
  skills: {
    type: [String],
    default: [],
  },
  address: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model ('Student', studentSchema);

module.exports = Student;
