const express = require('express');
const controller = require("../controllers/user.controller");
const router = new express.Router();
const auth = require("../middlewares/auth");

router.post("/signup", controller.userRegister);
router.post("/login", controller.userLogin);
router.post("/verify-refresh-token", controller.verifyRefreshToken);
router.use(auth);
//protected routes
router.get("/profile", controller.userProfile);

module.exports = router;