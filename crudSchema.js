const mongoose = require("mongoose");

const newSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  }
});

// 👇 'students' is collection name
const StudentModel = mongoose.model("students", newSchema);

module.exports = StudentModel;
