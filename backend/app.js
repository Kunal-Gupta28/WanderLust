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
      crypto: { secret: process.env.SECRET || process.env.SECRECT || "mysupersecretcode" },
      touchAfter: 24 * 3600,
    });
    sessionStore.on("error", (err) => console.log("Error in MONGO SESSION STORE:", err));
  } catch {
    sessionStore = undefined;
  }
}

const allowedOrigins = [
  process.env.FRONTEND_URL,
  "http://localhost:3000",
  "http://localhost:3001",
].filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      const isAllowed =
        allowedOrigins.some((o) => origin.startsWith(o)) ||
        origin.endsWith(".vercel.app") ||
        origin.includes("localhost");
      callback(null, isAllowed ? true : true);
    },
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const sessionOption = {
  ...(sessionStore ? { store: sessionStore } : {}),
  secret: process.env.SECRET || process.env.SECRECT || "mysupersecretcode",
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

const contactRouter = require("./routes/contact.js");
const paymentRouter = require("./routes/payment.js");
const messageRouter = require("./routes/message.js");

app.use("/api/listings", listingRouter);
app.use("/api/listings/:id/reviews", reviewsRouter);
app.use("/api/auth", userRouter);
app.use("/api/contact", contactRouter);
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
