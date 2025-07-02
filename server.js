const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ This serves your index.html, styles.css, script.js
app.use(express.static(path.join(__dirname)));

// API route
app.post("/api/contact", (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !email || !message) {
    return res.status(400).json({ error: "All fields are required." });
  }

  const newMessage = {
    id: Date.now(),
    firstName,
    lastName,
    email,
    message,
  };

  const filePath = path.join(__dirname, "messages.json");

  fs.readFile(filePath, "utf8", (err, data) => {
    let messages = [];
    if (!err && data) {
      messages = JSON.parse(data);
    }

    messages.push(newMessage);

    fs.writeFile(filePath, JSON.stringify(messages, null, 2), (err) => {
      if (err) {
        console.error("Error saving message:", err);
        return res.status(500).json({ error: "Failed to save message." });
      }

      res.json({ success: true, message: "Message received!" });
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
