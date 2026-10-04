const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "wanderlust_super_secret_jwt_key";
const JWT_EXPIRES_IN = "7d";

const generateToken = (user) => {
  return jwt.sign(
    { id: user._id || user.id, username: user.username, email: user.email, role: user.role || "traveler" },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
};

const sendTokenCookie = (res, token) => {
  const cookieOptions = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true, // HTTP-Only Cookie to prevent XSS attacks
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
  };
  res.cookie("token", token, cookieOptions);
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

module.exports = {
  JWT_SECRET,
  generateToken,
  sendTokenCookie,
  verifyToken,
};
