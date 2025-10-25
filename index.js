const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

const mongoose = require("mongoose");
const StudentModel = require('./Schema/crudSchema'); // ✅ Correct import

// ✅ MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ecommerceDB')
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.log("❌ MongoDB Error:", err));

// ✅ Read API (Get Data from MongoDB)
app.get("/read", async (req, res) => {
  try {
    const read = await StudentModel.find();
    res.json(read);
    console.log(req.body)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Save data to MongoDB (POST API)
app.post("/create", async (req, res) => {
  try {
    const{name,email,password} = req.body;
    const student = new StudentModel({ name, email, password });
    await student.save();
    res.status(201).json({ message: "Student Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });  
  }
});

app.put("/update/:id", async (req, res) => {
  try {
const id= req.params.id.trim();
    const updatedData = req.body; 
const student= await StudentModel.findByIdAndUpdate(id, updatedData, { new: true });
if(!student){
  return res.status(404).json({message:"Student not found"})

}
console.log("updated successfully",student)
    res.status(201).json({ message: "Student Created Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });  
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
const id= req.params.id.trim();

const student= await StudentModel.findByIdAndDelete(id);
if(!student){
      return res.status(404).json({ message: "Student not found" });

}
    console.log("Deleted Successfully", student);
    res.status(200).json({ message: "Student Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });  
  }
});
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
