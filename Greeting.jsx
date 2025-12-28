import { useState } from "react";

function Sms() {
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phone, message }),
      });

      const data = await res.json();
      setStatus(data.message);
    } catch (error) {
      setStatus("Error sending SMS ❌");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Send SMS</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Phone number (+92...)"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br /><br />

        <textarea
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <br /><br />

        <button type="submit">Send SMS</button>
      </form>

      <p>{status}</p>
    </div>
  );
}

export default Sms;
