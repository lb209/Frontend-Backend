const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.get('/',(req,res)=>{
  fs.writeFile('./public/output.txt','Hello fs ',(err)=>{
    if(err){
   return   res.status(500).send('Error writing file');
    }
  return  res.send('File written successfully');
  })
})


// Read File
app.get('/read',(req,res)=>{
  fs.readFile('./public/output.txt',(err,data)=>{
    if(err){
   return   res.status(500).send('Error writing file');
    }
 return   res.send(data);
  })
})

//append file
app.get('/append',(req,res)=>{
  fs.appendFile('./public/output.txt','\nNew file append',(err)=>{
    if(err){
   return   res.status(500).send('Error appendfile');
    }
 return   res.send('File append successfully');
  })
})

//delete file

app.get('/delete',(req,res)=>{
  fs.unlink('./public/output.txt',(err)=>{
    if(err){
    return  res.status(500).send('Error appendfile');
    }
   return res.send('File delete successfully');
  })
})

//reade folder
app.get('/readf',(req,res)=>{
  fs.readdir('./public',(err,files)=>{
    if(err){
    return  res.status(500).send('Error appendfile');
    }
  files.forEach(file=>{
      console.log(file);
  })
  
  return  res.send('Folder read successfully  and check console');
  })
})
//rename folder
app.get('/rename',(req,res)=>{
  fs.rename('./public/output.txt','./public/newoutput.txt',(err)=>{
    if(err){
      return res.status(500).send('Error rename file');
    }
  return  res.send('File rename successfully');
  })
})
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
