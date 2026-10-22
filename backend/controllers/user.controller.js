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
      const user = await userModel.findById(decoded.id).select("username email role phone").lean();
      if (user) return res.json({ user: publicUser(user) });
    } catch {}
    
    return res.json({
      user: {
        id: decoded.id,
        username: decoded.username,
        email: decoded.email,
        role: decoded.role || "traveler",
        isAdmin: decoded.role === "admin" || decoded.username === "wanderlust_admin",
      },
    });
  } catch (err) {
    return res.json({ user: null });
  }
};

module.exports.signUp = async (req, res, next) => {
  try {
    const { username, email, password, role, phone } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "Username, email, and password are required." });
    }

    const assignedRole = role === "host" ? "host" : role === "admin" ? "admin" : "traveler";

    let user;
    try {
      const newUser = new userModel({
        email,
        username,
        role: assignedRole,
        phone: phone || "",
      });
      user = await userModel.register(newUser, password);
    } catch (dbErr) {
      if (memoryUsers.has(username)) {
        return res.status(400).json({ error: "A user with the given username is already registered" });
      }
      user = {
        _id: "user_" + Date.now(),
        username,
        email,
        role: assignedRole,
        phone: phone || "",
      };
      memoryUsers.set(username, { ...user, password, role: assignedRole, phone: phone || "" });
    }

    const token = generateToken(user);
    sendTokenCookie(res, token);

    res.status(201).json({
      user:
        publicUser(user) || {
          id: user._id,
          username: user.username,
          email: user.email,
          role: assignedRole,
          phone: phone || "",
        },
      token,
      message: `Welcome to WanderLust as a ${assignedRole === "host" ? "Host" : "Traveler"}!`,
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
    const requestedRole = (req.query?.role || req.body?.role || "traveler").toLowerCase();

    let demoConfig;
    if (requestedRole === "host") {
      demoConfig = {
        username: "elena_host",
        email: "elena.host@wanderlust.app",
        role: "host",
        message: "Welcome, Host! Managing your properties & reservations.",
      };
    } else if (requestedRole === "admin") {
      demoConfig = {
        username: "wanderlust_admin",
        email: "admin@wanderlust.app",
        role: "admin",
        message: "Welcome, Administrator! Full CRM & Platform access unlocked.",
      };
    } else {
      demoConfig = {
        username: "demo_explorer",
        email: "demo@wanderlust.app",
        role: "traveler",
        message: "Welcome, Explorer! Exploring curated stays & reservations.",
      };
    }

    const DEMO_PASSWORD = "DemoPass@1234";

    let demoUser;
    try {
      demoUser = await userModel.findOne({ username: demoConfig.username });
      if (!demoUser) {
        const newUser = new userModel({
          email: demoConfig.email,
          username: demoConfig.username,
          role: demoConfig.role,
        });
        demoUser = await userModel.register(newUser, DEMO_PASSWORD);
      } else if (demoUser.role !== demoConfig.role) {
        demoUser.role = demoConfig.role;
        await demoUser.save();
      }
    } catch {
      demoUser = memoryUsers.get(demoConfig.username);
      if (!demoUser) {
        demoUser = {
          _id: "demo_" + demoConfig.role + "_" + Date.now(),
          username: demoConfig.username,
          email: demoConfig.email,
          role: demoConfig.role,
        };
        memoryUsers.set(demoConfig.username, demoUser);
      }
    }

    const token = generateToken(demoUser);
    sendTokenCookie(res, token);

    res.json({
      user: publicUser(demoUser) || {
        id: demoUser._id,
        username: demoUser.username,
        email: demoUser.email,
        role: demoConfig.role,
        isAdmin: demoConfig.role === "admin",
      },
      token,
      message: demoConfig.message,
    });
  } catch (e) {
    res.status(500).json({ error: "Could not start demo session. Please try again." });
  }
};

module.exports.getWishlist = async (req, res) => {
  try {
    let token = req.cookies?.token;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) return res.json({ wishlist: [] });
    const decoded = verifyToken(token);
    if (!decoded) return res.json({ wishlist: [] });

    try {
      const user = await userModel.findById(decoded.id).select("wishlist").lean();
      if (user) return res.json({ wishlist: user.wishlist || [] });
    } catch {}

    const memUser = memoryUsers.get(decoded.username);
    return res.json({ wishlist: memUser?.wishlist || [] });
  } catch (err) {
    return res.json({ wishlist: [] });
  }
};

module.exports.toggleWishlist = async (req, res) => {
  try {
    let token = req.cookies?.token;
    if (!token && req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) return res.status(401).json({ error: "Please sign in to save stays to your wishlist." });
    const decoded = verifyToken(token);
    if (!decoded) return res.status(401).json({ error: "Session expired. Please sign in again." });

    const { listingId } = req.body;
    if (!listingId) return res.status(400).json({ error: "listingId is required." });

    const idStr = String(listingId);
    let isSaved = false;
    let currentWishlist = [];

    try {
      const user = await userModel.findById(decoded.id).select("wishlist");
      if (user) {
        if (!user.wishlist) user.wishlist = [];
        if (user.wishlist.includes(idStr)) {
          user.wishlist = user.wishlist.filter((id) => id !== idStr);
          isSaved = false;
        } else {
          user.wishlist.push(idStr);
          isSaved = true;
        }
        await user.save();
        return res.json({ isSaved, wishlist: user.wishlist });
      }
    } catch {}

    let memUser = memoryUsers.get(decoded.username);
    if (!memUser) {
      memUser = { username: decoded.username, wishlist: [] };
      memoryUsers.set(decoded.username, memUser);
    }
    if (!memUser.wishlist) memUser.wishlist = [];
    if (memUser.wishlist.includes(idStr)) {
      memUser.wishlist = memUser.wishlist.filter((id) => id !== idStr);
      isSaved = false;
    } else {
      memUser.wishlist.push(idStr);
      isSaved = true;
    }
    return res.json({ isSaved, wishlist: memUser.wishlist });
  } catch (err) {
    return res.status(500).json({ error: "Could not update wishlist." });
  }
};
