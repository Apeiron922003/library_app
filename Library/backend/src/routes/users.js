var express = require("express");
const userController = require("../controllers/clients/user.controller");
var router = express.Router();

/* GET users listing. */

router.get("/", userController.index);
router.get("/:id", userController.detail);
module.exports = router;
