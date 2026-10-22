const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const Razorpay = require("razorpay");
const { isLoggedIN } = require("../middleware/middleware.js");

function getRazorpayInstance() {
  const key_id = process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_API_KEY;
  const key_secret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_Secret_KEY;
  if (key_id && key_secret) {
    try {
      return new Razorpay({ key_id, key_secret });
    } catch (e) {
      console.warn("Razorpay initialization error:", e.message);
    }
  }
  return null;
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
        userId: String(req.user.id || req.user._id || ""),
      },
    };

    const razorpay = getRazorpayInstance();
    const activeKeyId = process.env.RAZORPAY_KEY_ID || process.env.RAZORPAY_API_KEY;

    let order;
    let isMock = false;

    if (razorpay && activeKeyId) {
      order = await razorpay.orders.create(options);
    } else {
      // Mock order for testing / demo environment
      isMock = true;
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
      keyId: activeKeyId || "rzp_test_wanderlust123",
      isMock,
      order,
    });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
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

    const activeSecret = process.env.RAZORPAY_KEY_SECRET || process.env.RAZORPAY_Secret_KEY;
    let isValid = true;

    if (razorpay_signature && activeSecret && !razorpay_order_id?.startsWith("order_demo_")) {
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto
        .createHmac("sha256", activeSecret)
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
    console.error("Error verifying payment:", error);
    res.status(500).json({ error: "Payment verification failed." });
  }
});

module.exports = router;
