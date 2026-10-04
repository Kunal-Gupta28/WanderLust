const express = require("express");
const router = express.Router();
const { isLoggedIN } = require("../middleware/middleware.js");

// In-memory messages store for fast host <-> visitor chat
const messagesStore = [];

// Seed sample initial conversation
messagesStore.push({
  id: "msg_sample_1",
  senderId: "host_sample",
  senderName: "Elena Rostova (Host)",
  senderRole: "host",
  recipientId: "all",
  listingId: "sample_1",
  content: "Hello! Welcome to WanderLust. I am the host of this stay. Let me know if you have any questions about check-in or local trails!",
  createdAt: new Date(Date.now() - 3600000),
});

// Send a Message between Visitor & Host
router.post("/", isLoggedIN, (req, res) => {
  const { recipientId, recipientName, listingId, content } = req.body;
  if (!content || !content.trim()) {
    return res.status(400).json({ error: "Message content cannot be empty." });
  }

  const newMessage = {
    id: `msg_${Date.now()}`,
    senderId: String(req.user.id || req.user._id),
    senderName: req.user.username || "Traveler",
    senderRole: req.user.role || "traveler",
    recipientId: recipientId || "host",
    recipientName: recipientName || "Property Owner",
    listingId: listingId || "",
    content: content.trim(),
    createdAt: new Date(),
  };

  messagesStore.push(newMessage);
  res.status(201).json({ ok: true, message: newMessage });
});

// Get All Messages for Current User Conversation
router.get("/", isLoggedIN, (req, res) => {
  const userId = String(req.user.id || req.user._id);
  const userMessages = messagesStore.filter(
    (m) => m.recipientId === "all" || String(m.senderId) === userId || String(m.recipientId) === userId
  );
  res.json({ ok: true, messages: userMessages });
});

module.exports = router;
