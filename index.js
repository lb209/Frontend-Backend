
const express= require('express');
const app= express()
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.set('view engine', 'ejs');

app.get('/get',(req,res)=>{
  res.send('Hellow world i am res.send  response method ')
})
app.post('/post', (req, res) => {
  res.json({ message: 'Hellow world i am res.json  response method' });  // ✅
});
app.get('/redirect', (req, res) => {
  res.redirect('https://www.google.com');   // / سے /home پر redirect
});

app.get('/render', (req, res) => {
  res.render('home')
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});