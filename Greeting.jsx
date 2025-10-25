import React from 'react'

export default function Greeting() {
  const[message,setMessage]=React.useState("");
  const [name,setName]=React.useState("");
  const [pass,setpass]=React.useState("");
  //with error handling
  const login=()=>{
    try {
      if(name.includes("@gmail.com") && pass.length>=6){
      setMessage("Login Successful");
    }else{
      setMessage("Please enter valid credentials and include @gmail.com");
    }
    } catch (error) {
      setMessage("Your code is not correct")
    }
  }
  // error handling ends here
  
  return (
    <div>
         <h1>Error Handling</h1>


<input type="text" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} />
<input type="number" placeholder='Enter Password' value={pass} onChange={(e)=>setpass(e.target.value)} />
<button onClick={login}>Click</button>
<p>{message}</p>
    </div>
  )
}
