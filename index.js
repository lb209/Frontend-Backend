const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 5000;

// Rate Limiter
const limiter= rateLimit({
  windowMs: 1000 * 60, // 15 minutes
  max: 3, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
})

// Apply only on API routes
app.use('/api', limiter);

// Test Route
app.get('/', (req, res) => {
  res.send('Welcome to the eCommerce Backend!');
});

// Example API
app.get('/api/products', (req, res) => {
  res.send( 'Products API working' );
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
