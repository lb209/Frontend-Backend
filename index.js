
const express= require('express');
const app= express()
const PORT = process.env.PORT || 5000;
const cors = require('cors');
app.use(cors());

app.get('/get',(req,res)=>{
  res.send('Hellow world from backend  get Api ')
})
app.post('/post', (req, res) => {
  res.json({ message: 'Hello from backend post API' });  // ✅
});

app.put('/put', (req, res) => {
  res.json({ message: 'Hello from backend put API' });  // ✅
});

app.delete('/delete', (req, res) => {
  res.json({ message: 'Hello from backend delete API' });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});