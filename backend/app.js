if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const cors = require("cors");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const listingRouter = require("./routes/listing.js");
const reviewsRouter = require("./routes/reviews.js");
const userRouter = require("./routes/user.js");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/users.model.js");
const cookieParser = require("cookie-parser");
const port = process.env.PORT || 3000;
const connectToDB = require("./config/ConnectToDB.js");

connectToDB();

let sessionStore;
if (process.env.ATLASDB_URL) {
  try {
    sessionStore = MongoStore.create({
      mongoUrl: process.env.ATLASDB_URL,
      crypto: { secret: process.env.SECRET || "mysupersecretcode" },
      touchAfter: 24 * 3600,
    });
    sessionStore.on("error", (err) => console.log("Error in MONGO SESSION STORE:", err));
  } catch {
    sessionStore = undefined;
  }
}

const frontendOrigin = process.env.FRONTEND_URL || "http://localhost:3001";

app.use(
  cors({
    origin: frontendOrigin,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const sessionOption = {
  ...(sessionStore ? { store: sessionStore } : {}),
  secret: process.env.SECRET || "mysupersecretcode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  },
};

app.use(session(sessionOption));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/api/health", (req, res) => {
  res.json({ ok: true });
});

const fs = require("fs");
const path = require("path");
const inquiriesFile = path.join(__dirname, "data/contact-inquiries.json");

app.post("/api/contact", (req, res) => {
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

  console.log(`[CONTACT INQUIRY] From: ${newInquiry.name} (${email}) | Subject: ${subject} | Message: ${message}`);
  res.json({ ok: true, message: "Thank you! Your message has been received by the WanderLust team.", inquiry: newInquiry });
});

app.get("/api/contact/inquiries", (req, res) => {
  try {
    if (fs.existsSync(inquiriesFile)) {
      return res.json(JSON.parse(fs.readFileSync(inquiriesFile, "utf-8")));
    }
  } catch {}
  res.json([]);
});

const paymentRouter = require("./routes/payment.js");
const messageRouter = require("./routes/message.js");

app.use("/api/listings", listingRouter);
app.use("/api/listings/:id/reviews", reviewsRouter);
app.use("/api/auth", userRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/messages", messageRouter);

app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Route not found."));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.statuscode || 500;
  const message = err.message || "Something went wrong.";
  res.status(statusCode).json({ error: message });
});

app.listen(port, () => {
  console.log(`API running on port: ${port}`);
});
