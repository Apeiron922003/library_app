var express = require("express");
const authController = require("../controllers/clients/auth.controller");
var router = express.Router();

/* GET auth page. */
router.get("/", authController.index);
router.get("/login", authController.login);
router.post("/login", authController.handleLogin);
router.get("/register", authController.register);
router.post("/register", authController.handleRegister);

module.exports = router;
