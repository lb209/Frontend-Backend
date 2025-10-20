import React, { useState } from 'react'
import axios from 'axios';
export default function Greeting() {
  const[message,setMessage]=useState('')
  const get= async()=>{
 await fetch('http://localhost:5000/get')
 .then((res)=>res.text())
 .then((data)=>setMessage(data))

  }
const post = async () => {
  await fetch('http://localhost:5000/post',{
    method:'POST',
    headers:{
      'Content-Type':'application/json',
    }
    
  })
   
    .then((res) => res.json())
    .then((data) => setMessage(data.message))
    .catch((error) => setMessage(error));
};

  

const put= async()=>{
  axios.put('http://localhost:5000/put')
  .then((res)=> setMessage(res.data.message))
  .catch((error)=> console.log(error))
}

const del = async()=>{
  axios.delete('http://localhost:5000/delete')
  .then((res)=> setMessage(res.data.message))
  .catch((error)=> console.log(error))
}

  return (
    <div>
<h1>I am Fontend  and Backend Api</h1>
<button onClick={get}>Get</button>
<button onClick={post}>Post</button>
<button onClick={put}>Put</button>
<button onClick={del}>Delete</button>
<p>{message}</p>
    </div>
  )
}
