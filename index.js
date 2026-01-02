const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = 5000;

// PDF Generate Route
app.get("/generate-pdf", async (req, res) => {
  try {
    // 1️⃣ Browser open
    const browser = await puppeteer.launch({
      headless: "new"
    });

    // 2️⃣ New page
    const page = await browser.newPage();

    // 3️⃣ HTML content
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8" />
        <title>PDF</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
          }
          h1 {
            color: blue;
          }
          p {
            font-size: 16px;
          }
        </style>
      </head>
      <body>
        <h1>Hello PDF 👋</h1>
        <p>This PDF is generated using Node.js & Puppeteer</p>
        <p>Name: Hussain</p>
        <p>Date: ${new Date().toDateString()}</p>
      </body>
      </html>
    `;

    // 4️⃣ Load HTML
    await page.setContent(htmlContent, {
      waitUntil: "load"
    });

    // 5️⃣ Generate PDF
    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
    });

    // 6️⃣ Close browser
    await browser.close();

    // 7️⃣ Send PDF
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "attachment; filename=sample.pdf",
    });

    res.send(pdfBuffer);

  } catch (error) {
    console.log(error);
    res.status(500).send("PDF generate nahi ho saki ❌");
  }
});

// Test route
app.get("/", (req, res) => {
  res.send("PDF Backend is running");
});

// Server start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
