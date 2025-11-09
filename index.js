const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

// Cookie Set کرنا
app.get('/set-cookie', (req, res) => {
  res.cookie('username', 'Hussain', { maxAge: 60000 }); // 60 sec
  res.send('Cookie set ho gayi ✅');
});

// Cookie Read کرنا
app.get('/get-cookie', (req, res) => {
  const user = req.cookies.username;
  res.send(`Cookie Value: ${user}`);
});

// Cookie Delete کرنا
app.get('/clear-cookie', (req, res) => {
  res.clearCookie('username');
  res.send('Cookie delete ho gayi ❌');
});

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
