const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Dummy in-memory user data
const users = [];

// Secret key for JWT
const JWT_SECRET = "my_super_secret_key";

// ✅ Signup route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  // Check if user exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) return res.status(400).json({ message: "User already exists" });

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  // Generate JWT token
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: "Signup successful", token });
});

// ✅ Login route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ message: "User not found" });

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).json({ message: "Invalid password" });

  // Generate token again for login
  const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: '1h' });

  res.json({ message: "Login successful", token });
});

// ✅ Protected route example
app.get('/profile', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer <token>

  if (!token) return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.json({ message: "Access granted", user: decoded });
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
});

// Start server
app.listen(5000, () => console.log("✅ Server running on http://localhost:5000"));
