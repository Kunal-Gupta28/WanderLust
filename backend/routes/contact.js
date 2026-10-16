const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const inquiriesFile = path.join(__dirname, "../data/contact-inquiries.json");

router.post("/", (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;
  if (!email || !message) {
    return res.status(400).json({ error: "Email and message are required." });
  }

  const newInquiry = {
    id: `INQ-${Date.now()}`,
    name: `${firstName || ""} ${lastName || ""}`.trim() || "Anonymous Traveler",
    email,
    subject: subject || "General Inquiry",
    message,
    date: new Date().toISOString().split("T")[0],
    time: new Date().toLocaleTimeString(),
    status: "UNREAD",
  };

  try {
    let list = [];
    if (fs.existsSync(inquiriesFile)) {
      list = JSON.parse(fs.readFileSync(inquiriesFile, "utf-8"));
    }
    list.unshift(newInquiry);
    fs.mkdirSync(path.dirname(inquiriesFile), { recursive: true });
    fs.writeFileSync(inquiriesFile, JSON.stringify(list, null, 2));
  } catch (err) {
    console.error("Error saving contact inquiry:", err.message);
  }

  console.log(`[CONTACT INQUIRY] From: ${newInquiry.name} (${email}) | Subject: ${subject}`);
  res.json({
    ok: true,
    message: "Thank you! Your message has been received by the WanderLust team.",
    inquiry: newInquiry,
  });
});

router.get("/inquiries", (req, res) => {
  try {
    if (fs.existsSync(inquiriesFile)) {
      return res.json(JSON.parse(fs.readFileSync(inquiriesFile, "utf-8")));
    }
  } catch {}
  res.json([]);
});

module.exports = router;
