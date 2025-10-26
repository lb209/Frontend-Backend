// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
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
app.get('/read', (req, res) => {
  console.log("✅ Route '/read' executed");
  res.send("Hello from /read route!");
});

// ✅ Another route (for example)
app.get('/test', (req, res) => {
  res.send("Hello from /test route!");
});

// Start Server
app.listen(PORT, () => console.log(`✅ API Server running at http://localhost:${PORT}`));
