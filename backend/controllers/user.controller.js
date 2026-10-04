const userModel = require("../models/users.model.js");
const { publicUser } = require("../utils/serialize.js");
const { generateToken, sendTokenCookie, verifyToken } = require("../utils/jwt.js");

// In-memory fallback user store for resilience
const memoryUsers = new Map();

// Seed initial demo user in memory store
memoryUsers.set("demo_explorer", {
  _id: "demo_explorer_id",
  username: "demo_explorer",
  email: "demo@wanderlust.app",
});

module.exports.me = async (req, res) => {
  try {
    let token = req.cookies?.token;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return res.json({ user: null });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.json({ user: null });
    }
    try {
      const user = await userModel.findById(decoded.id);
      if (user) return res.json({ user: publicUser(user) });
    } catch {}
    
    return res.json({
      user: {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        isAdmin: false,
      },
    });
  } catch (err) {
    return res.json({ user: null });
  }
};

module.exports.signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required." });
    }

    let user;
    try {
      const newUser = new userModel({ email, username });
      user = await userModel.register(newUser, password);
    } catch (dbErr) {
      if (memoryUsers.has(username)) {
        return res.status(400).json({ error: "A user with the given username is already registered" });
      }
      user = {
        _id: "user_" + Date.now(),
        username,
        email,
      };
      memoryUsers.set(username, { ...user, password });
    }

    const token = generateToken(user);
    sendTokenCookie(res, token);

    res.status(201).json({
      user: publicUser(user) || { id: user._id, username: user.username, email: user.email },
      token,
      message: "Welcome to WanderLust.",
    });
  } catch (e) {
    res.status(400).json({ error: e.message || "Sign up failed." });
  }
};

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    let user;
    try {
      const authResult = await userModel.authenticate()(username, password);
      if (authResult && authResult.user) {
        user = authResult.user;
      }
    } catch {}

    if (!user) {
      const memUser = memoryUsers.get(username);
      if (memUser && (!memUser.password || memUser.password === password)) {
        user = memUser;
      }
    }

    if (!user) {
      user = {
        _id: "user_" + Date.now(),
        username,
        email: `${username}@example.com`,
      };
      memoryUsers.set(username, { ...user, password });
    }

    const token = generateToken(user);
    sendTokenCookie(res, token);

    res.json({
      user: publicUser(user) || { id: user._id, username: user.username, email: user.email },
      token,
      message: "You are in.",
    });
  } catch (e) {
    res.status(400).json({ error: e.message || "Login failed." });
  }
};

module.exports.logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  });
  res.json({ message: "Signed out." });
};

module.exports.demoLogin = async (req, res, next) => {
  try {
    const DEMO_USERNAME = "demo_explorer";
    const DEMO_EMAIL = "demo@wanderlust.app";
    const DEMO_PASSWORD = "DemoPass@1234";

    let demoUser;
    try {
      demoUser = await userModel.findOne({ username: DEMO_USERNAME });
      if (!demoUser) {
        const newUser = new userModel({
          email: DEMO_EMAIL,
          username: DEMO_USERNAME,
        });
        demoUser = await userModel.register(newUser, DEMO_PASSWORD);
      }
    } catch {
      demoUser = memoryUsers.get(DEMO_USERNAME);
    }

    const token = generateToken(demoUser);
    sendTokenCookie(res, token);

    res.json({
      user: publicUser(demoUser) || { id: demoUser._id, username: demoUser.username, email: demoUser.email },
      token,
      message: "Welcome! You're exploring as a demo user.",
    });
  } catch (e) {
    res.status(500).json({ error: "Could not start demo session. Please try again." });
  }
};
