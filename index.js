const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

// root folder ko static bana diya
app.use(express.static(path.join(__dirname, 'public')));

// test route
app.get('/pu', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
