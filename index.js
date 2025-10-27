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

app.use(express.json());
app.use(cors());

// Custom Middleware (Must have req, res, next)
const Middleware = (req, res, next) => {
  console.log("✅ Middleware executed");
  next(); // Move to next function
};

app.use(Middleware); // Apply middleware globally

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/ecommerceDB')
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Error:", err));

// ✅ Route with Middleware properly used
let validationRegistration=[
  body('name').isLength({min:3,max:5}).withMessage('Name must be at least 3 characters long'),
  body('email').isEmail().withMessage('Invalid email address')

]
app.post('/myForm',validationRegistration, (req, res) => {
  const errors=validationResult(req);
  if(errors.isEmpty()){
    res.send(req.body);
  }else{
    res.status(400).json({errors:errors.array()})
  }
});
// ✅ Another route (for example)
app.get('/test', (req, res) => {
  res.render('login')

});

// Start Server
app.listen(PORT, () => console.log(`✅ API Server running at http://localhost:${PORT}`));
