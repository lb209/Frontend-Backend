require('dotenv').config();
const StudentModel = require("../Schema/crudSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const alldata = async (req, res) => {
  try {
    const deet = await StudentModel.find({}, { password: 0 }); // ✅ find() not findOne()
    res.status(200).json(deet); // ✅ status code fix
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};


const registration= async(req,res)=>{
  try {
    const{name,email,password}=req.body
   const user=await StudentModel.findOne({email})
   if(user) return res.status(400).json({message:"email is already used please try again"})
    const hashedPassword= await bcrypt.hash(password,10)
    const eat=  new StudentModel({name,email,password:hashedPassword})
  const saved= await eat.save()
  res.json(saved)
    
  } catch (error) {
    res.status(400).json({message:"ergistration error"})
  }
}




const login= async(req,res)=>{
  try {
    const{email,password}=req.body
    const userlogin= await StudentModel.findOne({email})
    if(!userlogin) return res.status(400).json({message:"email is not login"})
      const isMatch= await bcrypt.compare(password,userlogin.password)
    if(!isMatch) return res.status(400).json({message:"password is not match"})
   
      const token=jwt.sign(
        {userID:userlogin._id,name:userlogin.name},
        process.env.JWT_SECRET,
        {expiresIn:"1h"}
      )
     res.status(200).json({
  message: "Login successful",
  token: token
});

  } catch (error) {
    res.status(400).json({message:"login error"})
  }
}


module.exports = {registration,login,alldata };
