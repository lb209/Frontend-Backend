// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const{body,validationResult}=require('express-validator');
// Middleware
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
const path = require('path'); 
const multer= require('multer')
app.use(express.json());
app.use(cors());

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'uploads/')
  },
  filename:(req,file,cb)=>{
    cb(null,Date.now()+'-'+file.originalname)
  }

})
const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='image/png'){ 
    cb(null,true)
  }else{
    cb(new Error('Only jpeg files are allowed'),false)
  }
}
const upload=multer({
  storage:storage,
  limits:{fileSize:1024*1024*5},
fileFilter:fileFilter

})

app.get('/',(req,res)=>{
  res.render('login')
})
app.post('/myForm',upload.single('profile'),(req,res)=>{
res.send(req.file)
})


// Start Server
app.listen(PORT, () => console.log(`✅ API Server running at http://localhost:${PORT}`));
