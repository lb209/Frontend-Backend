const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect("mongodb://localhost:27017/ecommerceDB")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  city: String,
});

const StudentModel = mongoose.model("Student", studentSchema);

// CREATE
app.post("/create", async (req, res) => {
  try {
    const { name, city } = req.body;
    const newStudent = await StudentModel.create({ name, city });
    res.json(newStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ (all students)
app.get("/read", async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE
app.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, city } = req.body;
    const updatedStudent = await StudentModel.findByIdAndUpdate(
      id,
      { name, city },
      { new: true }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedStudent = await StudentModel.findByIdAndDelete(id);
    res.json(deletedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
