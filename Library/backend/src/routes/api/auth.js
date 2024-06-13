const express = require("express");
const authController = require("../../controllers/api/auth.controller");
const authMiddlewares = require("../../middlewares/api/auth.middlewares");
const router = express.Router();

/* GET users listing. */
// router.get("/", authController.index);

// Actions a user

router.post("/login", authController.login);
router.get("/profile", authMiddlewares, authController.profile);
router.post("/register", authController.register);
router.post("/logout", authMiddlewares, authController.logout);
router.post("/refresh", authController.refresh);

module.exports = router;
