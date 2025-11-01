const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.get('/go', (req, res) => {
//   res.render('login');
// });
const session=require('express-session');
const { error } = require('jquery');
app.use(session({
  secret:'secreat',
  resave:'false',
  saveUninitialized:'false',
  cooki:{maxAge:1000*60*60*24}
}))

app.get('/', (req, res) => {
  if (req.session.username) {
  res.send("hy i am hussain")
}else{
  res.send('no user name')
}
}
);


app.get('/username',(req,res)=>{
  req.session.username='HUssain'
  res.send('username is sent')
})


app.get('/username1',(req,res)=>{
if (req.session.username) {
  res.send("hy i am hussain")
}else{
  res.send('no user name')
}

})
app.get('/destroay',(req,res)=>{
  req.session.destroy((error)=>{
    if(error){
      res.send('faild')
    }else{
      res.send('good')
    }
  })
})

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});