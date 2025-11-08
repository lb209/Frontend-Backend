const express = require('express');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Temporary in-memory user storage
let users = [];

// GET signup page
app.get('/signup', (req, res) => {
  res.render('signup', { error: null });
});

// POST signup form
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render('signup', { error: 'Email اور Password دونوں لازمی ہیں' });
  }

  // Check duplicate
  if (users.find(u => u.email === email)) {
    return res.render('signup', { error: 'User already exists! Login instead' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ email, password: hashedPassword });

  // Redirect to login page
  res.redirect('/login');
});

// GET login page
app.get('/login', (req, res) => {
  res.render('login', { error: null });
});

// POST login form
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = users.find(u => u.email === email);
  if (!user) return res.render('login', { error: 'User not found! Signup first.' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.render('login', { error: 'Incorrect password!' });

  // Login successful → render welcome page
  res.render('welcome', { email });
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
