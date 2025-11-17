import React, { useState, useEffect, useRef } from "react";

export default function Greeting() {
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [students, setStudents] = useState([]);
  const [editId, setEditId] = useState(null);
  const foc = useRef(null);

  // READ
  const readStudents = async () => {
    try {
      const res = await fetch("http://localhost:5000/read");
      const data = await res.json();
      setStudents(data.reverse());
    } catch (err) {
      console.error(err);
    }
  };

  // CREATE
  const createStudent = async () => {
    if (!name || !city) return alert("Name and City are required!");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("city", city);
    if (image) formData.append("image", image);

    try {
      await fetch("http://localhost:5000/create", {
        method: "POST",
        body: formData,
      });
      setName("");
      setCity("");
      setImage(null);
      setPreview("");
      readStudents();
    } catch (err) {
      console.error(err);
    }
  };

  // UPDATE
  const updateStudent = async (id) => {
    if (!name || !city) return alert("Name and City are required!");
    const formData = new FormData();
    formData.append("name", name);
    formData.append("city", city);
    if (image) formData.append("image", image);

    try {
      await fetch(`http://localhost:5000/update/${id}`, {
        method: "PUT",
        body: formData,
      });
      setName("");
      setCity("");
      setImage(null);
      setPreview("");
      setEditId(null);
      readStudents();
    } catch (err) {
      console.error(err);
    }
  };

  // DELETE
  const deleteStudent = async (id) => {
    try {
      await fetch(`http://localhost:5000/delete/${id}`, {
        method: "DELETE",
      });
      readStudents();
    } catch (err) {
      console.error(err);
    }
  };

  // IMAGE Preview
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  useEffect(() => {
    readStudents();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #3a7bd5, #3a6073)",
        padding: "30px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          background: "rgba(255,255,255,0.15)",
          padding: "25px",
          borderRadius: "15px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.3)",
          backdropFilter: "blur(12px)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "25px",
            color: "white",
            fontSize: "35px",
            letterSpacing: "1px",
          }}
        >
          🎓 Student Management – CRUD + Image Upload
        </h1>

        {/* FORM */}
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            gap: "10px",
            padding: "15px",
            background: "rgba(255,255,255,0.2)",
            borderRadius: "12px",
            backdropFilter: "blur(10px)",
            flexWrap: "wrap",
          }}
        >
          <input
            type="text"
            ref={foc}
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              padding: "12px",
              flex: 1,
              borderRadius: "8px",
              border: "none",
              outline: "none",
            }}
          />

          <input
            type="text"
            placeholder="Enter City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            style={{
              padding: "12px",
              flex: 1,
              borderRadius: "8px",
              border: "none",
              outline: "none",
            }}
          />

          <input type="file" onChange={handleImage} />

          {editId ? (
            <button
              onClick={() => updateStudent(editId)}
              style={{
                padding: "10px 15px",
                background: "#4CAF50",
                color: "white",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Update
            </button>
          ) : (
            <button
              onClick={createStudent}
              style={{
                padding: "10px 15px",
                background: "#2196F3",
                color: "white",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
              }}
            >
              Create
            </button>
          )}

          <button
            onClick={readStudents}
            style={{
              padding: "10px 15px",
              background: "#673AB7",
              color: "white",
              borderRadius: "8px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Refresh
          </button>
        </div>

        {/* IMAGE Preview — ROUND */}
        {preview && (
          <div style={{ marginBottom: "15px", textAlign: "center" }}>
            <img
              src={preview}
              alt="preview"
              width="120"
              height="120"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 4px 10px rgba(0,0,0,0.4)",
              }}
            />
          </div>
        )}

        <h2 style={{ color: "white", marginBottom: "10px" }}>Students List</h2>

        {/* TABLE */}
        <div
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            borderRadius: "12px",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "rgba(255,255,255,0.25)",
              backdropFilter: "blur(10px)",
              borderRadius: "10px",
            }}
          >
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.3)" }}>
                <th style={{ padding: "10px" }}>Image</th>
                <th style={{ padding: "10px" }}>Name</th>
                <th style={{ padding: "10px" }}>City</th>
                <th style={{ padding: "10px" }}>Actions</th>
              </tr>
            </thead>

            <tbody>
              {students.map((s) => (
                <tr key={s._id} style={{ borderBottom: "1px solid #ddd" }}>
                  <td style={{ padding: "10px" }}>
                    <img
                      src={`http://localhost:5000/uploads/${s.image}`}
                      width="60"
                      height="60"
                      style={{
                        borderRadius: "50%",
                        objectFit: "cover",
                        border: "2px solid white",
                      }}
                      alt=""
                    />
                  </td>

                  <td style={{ padding: "10px", color: "white" }}>{s.name}</td>
                  <td style={{ padding: "10px", color: "white" }}>{s.city}</td>

                  <td style={{ padding: "10px", display: "flex", gap: "8px" }}>
                    <button
                      onClick={() => {
                        setEditId(s._id);
                        setName(s.name);
                        setCity(s.city);
                        setPreview(`http://localhost:5000/uploads/${s.image}`);
                      }}
                      style={{
                        padding: "6px 10px",
                        background: "#4CAF50",
                        color: "white",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteStudent(s._id)}
                      style={{
                        padding: "6px 10px",
                        background: "#f44336",
                        color: "white",
                        borderRadius: "6px",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
