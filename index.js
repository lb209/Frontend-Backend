// index.js
const express = require('express');
const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const cors = require("cors"); // React Frontend Allow
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ecommerceDB')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// Schema
const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});
studentSchema.plugin(mongoosePaginate);
const Student = mongoose.model('students', studentSchema);

// ✅ Get Students (Pagination API)
app.get('/api/students', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  try {
    const result = await Student.paginate({}, { page, limit, sort: { name: 1 } });
    res.json({
      students: result.docs,
      currentPage: result.page,
      totalPages: result.totalPages,
      totalStudents: result.totalDocs
    });
  } catch (err) {
    res.status(500).json({ error: "Server Error" });
  }
});

// ✅ Create Student (POST)
app.post('/api/students', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const student = await Student.create({ name, email, password });
    res.status(201).json({ message: "Student Created Successfully", student });
  } catch (err) {
    res.status(500).json({ error: "Error creating student" });
  }
});

// ✅ Get Single Student for Edit
app.get('/api/students/:id', async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (err) {
    res.status(404).json({ error: "Student not found" });
  }
});

// ✅ Update Student
app.put('/api/students/:id', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const updated = await Student.findByIdAndUpdate(req.params.id, { name, email, password }, { new: true });
    res.json({ message: "Updated Successfully", updated });
  } catch (err) {
    res.status(500).json({ error: "Error updating student" });
  }
});

// ✅ Delete Student
app.delete('/api/students/:id', async (req, res) => {
  try {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted Successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting student" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`✅ API Server running at http://localhost:${PORT}`));
