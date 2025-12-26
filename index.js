const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = 5000;

// 🔐 Helmet middleware
app.use(helmet());

// ⏳ Rate Limiter
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 3,
  message: 'Too many requests, try again later'
});
app.use('/api', limiter);

// Test route
app.get('/', (req, res) => {
  res.send('Secure Backend is running');
});

// API
app.get('/api/products', (req, res) => {
  res.json({ message: 'Products API working' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
