import React from 'react'

function Greeting() {
  const [email,setEmail]=React.useState("");
  const [password,setPassword]=React.useState("");
  const signup=async()=>{
fetch("http://localhost:5000/signup",{
  method:"POST",
  headers:{
    "Content-Type":"application/json"
  },
  body:JSON.stringify({email,password})
}).then(res=>res.json()).then(data=>{
  console.log(data);
}).catch(err=>{
  console.error("Error:",err);
})  
  }
  const login=async()=>{
    fetch("http://localhost:5000/login",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({email,password})
    }).then(res=>res.json()).then(data=>{
      console.log(data);
    }).catch(err=>{
      console.error("Error:",err);
    })  
      }
  return (
    <div>
      <h1>Welcome to our E-Commerce Platform!</h1>
      <input type="text" name='name' placeholder='emial' value={email} onChange={(e)=>setEmail(e.target.value)} />
       <input type="text" name='name' placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
       <button onClick={signup}>signup</button>
              <button onClick={login}>login</button>
    </div>
  )
}

export default Greeting