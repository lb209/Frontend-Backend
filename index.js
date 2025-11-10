const express = require('express');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');

const app = express();

// Middleware setup
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// CSRF Protection
const csrfProtection = csrf({ cookie: true });

app.set('view engine', 'ejs');

// GET Signup Page
app.get('/signup', csrfProtection, (req, res) => {
  res.render('signup', { csrfToken: req.csrfToken(), error: null });
});

// POST Signup
app.post('/signup', csrfProtection, (req, res) => {
  const { email, password } = req.body;
  // User save logic (database add karna etc.)
  res.send(`✅ User registered successfully with email: ${email}`);
});

// Server Run
app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
