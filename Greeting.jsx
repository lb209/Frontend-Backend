import React, { useState } from 'react';

export default function Greeting() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [id, setId] = useState(''); // ✅ Update/Delete کیلئے ID

  // ✅ GET - Read Data
  const get = async () => {
    try {
      const res = await fetch('http://localhost:5000/read');
      const data = await res.json();
      console.log(data);
      setMessage(JSON.stringify(data, null, 2));
    } catch (error) {
      setMessage("Error in GET request");
    }
  };

  // ✅ POST - Create Data
  const post = async () => {
    try {
      const res = await fetch('http://localhost:5000/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error in POST request");
    }
  };

  // ✅ PUT - Update Data
  const put = async () => {
    try {
      const res = await fetch(`http://localhost:5000/update/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error in PUT request");
    }
  };

  // ✅ DELETE - Delete Data
  const del = async () => {
    try {
      const res = await fetch(`http://localhost:5000/delete/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      setMessage(data.message);
    } catch (error) {
      setMessage("Error in DELETE request");
    }
  };

  return (
    <div>
      <h1>React + Express + MongoDB (CRUD)</h1>
      
      <input type="text" placeholder="Enter ID (for Update/Delete)"
        value={id} onChange={(e) => setId(e.target.value)} /> <br />
      <input type="text" placeholder="Enter Name"
        value={name} onChange={(e) => setName(e.target.value)} /> <br />
      <input type="text" placeholder="Enter Email"
        value={email} onChange={(e) => setEmail(e.target.value)} /> <br />
      <input type="text" placeholder="Enter Password"
        value={password} onChange={(e) => setPassword(e.target.value)} /> <br />

      <button onClick={get}>Read (GET)</button>
      <button onClick={post}>Create (POST)</button>
      <button onClick={put}>Update (PUT)</button>
      <button onClick={del}>Delete (DELETE)</button>

      <pre>{message}</pre>
    </div>
  );
}
