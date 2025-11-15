import React, { useState, useEffect } from "react";

export default function Greeting() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);

  // READ all students
  const readStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/read");
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error(err);
    }
  };

  // CREATE
  const createStudent = async () => {
    if (!name || !city) return alert("Name and City are required!");
    try {
      const res = await fetch("http://localhost:5000/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, city }),
      });
      await res.json();
      setName("");
      setCity("");
      readStudents(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // UPDATE
  const updateStudent = async (id) => {
    if (!name || !city) return alert("Name and City are required!");
    try {
      const res = await fetch(`http://localhost:5000/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, city }),
      });
      await res.json();
      setName("");
      setCity("");
      setEditId(null);
      readStudents(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const deleteStudent = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });
      await res.json();
      readStudents(); // refresh list
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    readStudents();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>CRUD Model</h1>

      <input
        type="text"
        placeholder="Enter Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      {editId ? (
        <button onClick={() => updateStudent(editId)}>Update</button>
      ) : (
        <button onClick={createStudent}>Create</button>
      )}

      <button onClick={readStudents}>Read</button>

      <h2>Students List</h2>
      {students.length === 0 && <p>No students found</p>}
      <ul>
        {students.map((s) => (
          <li key={s._id}>
            {s.name} - {s.city}{" "}
            <button
              onClick={() => {
                setEditId(s._id);
                setName(s.name);
                setCity(s.city);
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteStudent(s._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
