const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const userController = require("../controllers/user.controller.js");

router.get("/me", wrapAsync(userController.me));

router.post("/signup", wrapAsync(userController.signUp));

router.post("/login", wrapAsync(userController.login));

router.post("/demo-login", wrapAsync(userController.demoLogin));

router.post("/logout", userController.logout);

module.exports = router;
