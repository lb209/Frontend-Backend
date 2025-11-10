const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const StudentModel = require('./Schema/crudSchema');
const app = express();
app.use(bodyParser.json());
const mongoose = require('mongoose');

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/testDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected ✅"))
.catch((err) => console.error("MongoDB connection error:", err));

// Dummy in-memory user data
const users = [];

// Secret key for JWT
const JWT_SECRET = "my_super_secret_key";

app.post('/signup',async(req,res)=>{
try {
    const{email,password}=req.body;
  const userExist=await StudentModel.findOne({email})
  if(userExist){
  return res.status(400).send({message:"User already exists"});
}

  const hashedPassword=await bcrypt.hash(password,10);
  const newUser=new StudentModel({email,password:hashedPassword});
  await newUser.save();
  const token=jwt.sign({email},JWT_SECRET,{expiresIn:"24h"});
  res.status(200).send({message:"User signed up successfully",token});
} catch (error) {
    res.status(500).send({message:"Internal Server Error"});
}
})
app.post('/login',async(req,res)=>{
  try {
    const{email,password}=req.body;
   
const user = await StudentModel.findOne({ email });
if(!user){
    return res.status(400).send({ message: "User not found" });
}

  const isMatch = await bcrypt.compare(password, user.password);
if(!isMatch){
    return res.status(400).send({ message: "Invalid credentials" });
}

  const token=jwt.sign({email},JWT_SECRET,{expiresIn:"24h"});
  res.status(200).send({message:"User logged in successfully",token});

  }catch(error){
   console.error(error); // console میں error دیکھو
   res.status(500).send({message:"Internal Server Error"});
}


  
})
app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
