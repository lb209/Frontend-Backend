const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = 5000;

// middleware
app.use(cors());
app.use(express.json());

// 🔐 Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = new twilio(accountSid, authToken);

// 📩 SMS Route
app.post("/send-sms", async (req, res) => {
  const { phone, message } = req.body;

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phone,
    });

    res.json({ success: true, message: "SMS sent successfully ✅" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "SMS failed ❌" });
  }
});

// test route
app.get("/", (req, res) => {
  res.send("SMS Backend is running");
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
