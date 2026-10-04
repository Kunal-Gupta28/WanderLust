const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");
const { isLoggedIN } = require("../middleware/middleware.js");

const KEY_ID = process.env.RAZORPAY_KEY_ID || "rzp_test_wanderlust123";
const KEY_SECRET = process.env.RAZORPAY_KEY_SECRET || "wanderlust_secret_123";

let razorpayInstance;
try {
  razorpayInstance = new Razorpay({
    key_id: KEY_ID,
    key_secret: KEY_SECRET,
  });
} catch (e) {
  console.warn("Razorpay initialization warning:", e.message);
}

// Create Razorpay Order
router.post("/create-order", isLoggedIN, async (req, res) => {
  try {
    const { amount, listingId, listingTitle } = req.body;
    if (!amount) {
      return res.status(400).json({ error: "Amount is required." });
    }

    const options = {
      amount: Math.round(Number(amount) * 100), // Amount in paise
      currency: "INR",
      receipt: `rcpt_${Date.now().toString().slice(-8)}`,
      notes: {
        listingId: listingId || "",
        userId: req.user.id || req.user._id,
      },
    };

    let order;
    if (razorpayInstance && process.env.RAZORPAY_KEY_ID) {
      order = await razorpayInstance.orders.create(options);
    } else {
      // Mock order for testing / demo environment
      order = {
        id: `order_demo_${Date.now()}`,
        entity: "order",
        amount: options.amount,
        currency: options.currency,
        receipt: options.receipt,
        status: "created",
      };
    }

    res.json({
      ok: true,
      keyId: KEY_ID,
      order,
    });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to create Razorpay order." });
  }
});

// Verify Razorpay Payment Signature & Confirm Booking
router.post("/verify-payment", isLoggedIN, async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      listingId,
      listingTitle,
      amount,
    } = req.body;

    let isValid = true;
    if (razorpay_signature && process.env.RAZORPAY_KEY_SECRET) {
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", KEY_SECRET)
        .update(body.toString())
        .digest("hex");
      isValid = expectedSignature === razorpay_signature;
    }

    if (!isValid) {
      return res.status(400).json({ error: "Payment verification failed. Invalid signature." });
    }

    res.json({
      ok: true,
      message: "Payment verified successfully! Your stay reservation is confirmed.",
      booking: {
        bookingId: `BK-${Date.now().toString().slice(-6)}`,
        listingId,
        listingTitle,
        amount,
        paymentId: razorpay_payment_id || `pay_${Date.now()}`,
        status: "CONFIRMED",
        createdAt: new Date(),
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Payment verification failed." });
  }
});

module.exports = router;
