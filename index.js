const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const PORT = 5000;

// middleware
app.use(express.json());
app.use(cors());

// Email Route
app.post("/send-email", async (req, res) => {
  const { email, subject, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "hussainshahzad.g254254@gmail.com", // ✅ correct
        pass: "hvhbcfiidinvghwg",                 // app password
      },
    });

    const mailOptions = {
      from: "hussainshahzad.g254254@gmail.com",   // ✅ correct
      to: email,
      subject: subject,
      text: message,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Email sent successfully ✅" });
  } catch (error) {
    console.log("EMAIL ERROR 👉", error);
    res.status(500).json({ message: "Email not sent ❌" });
  }
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
