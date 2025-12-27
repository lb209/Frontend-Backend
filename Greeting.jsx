import React, { useState } from "react";

export default function Greeting() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(""); // 👈 backend message

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, subject, message }),
      });

      const data = await res.json();
      setStatus(data.message); // 👈 show backend message

    } catch (error) {
      setStatus("Server error ❌");
    }
  };

  return (
    <div style={{ width: "300px", margin: "40px auto" }}>
      <h2>Send Email</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br /><br />

        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
        <br /><br />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        <br /><br />

        <button type="submit">Send</button>
      </form>

      {/* ✅ Backend message show here */}
      {status && (
        <p style={{ marginTop: "15px", color: "green" }}>
          {status}
        </p>
      )}
    </div>
  );
}
