const express = require("express");
const bookController = require("../controllers/clients/book.controller");
const router = express.Router();

/* GET users listing. */
router.get("/:id", bookController.detail);
router.get("/", bookController.index);

module.exports = router;
