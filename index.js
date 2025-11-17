const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// MongoDB
mongoose.connect("mongodb://localhost:27017/ecommerceDB")
  .then(() => console.log("DB Connected"))
  .catch(err => console.log(err));

// Schema
const studentSchema = new mongoose.Schema({
  name: String,
  city: String,
  image: String  // image file name
});

const StudentModel = mongoose.model("Student", studentSchema);

// ---------------------------
// Multer Storage (Corrected)
// ---------------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");  // ✔ Correct folder name
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + path.extname(file.originalname)
    );
  }
});

const upload = multer({ storage });

// ---------------------------
// CREATE Student
// ---------------------------
app.post("/create", upload.single("image"), async (req, res) => {
  try {
    const { name, city } = req.body;

    const newStudent = await StudentModel.create({
      name,
      city,
      image: req.file ? req.file.filename : null
    });

    res.json(newStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------
// READ Students
// ---------------------------
app.get("/read", async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------
// UPDATE Student
// ---------------------------
app.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const { name, city } = req.body;

    const updatedStudent = await StudentModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        city,
        ...(req.file && { image: req.file.filename })
      },
      { new: true }
    );

    res.json(updatedStudent);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---------------------------
// DELETE Student
// ---------------------------
app.delete("/delete/:id", async (req, res) => {
  try {
    const deleted = await StudentModel.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
