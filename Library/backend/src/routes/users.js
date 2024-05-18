var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({ a: "b", x: ["c", "d"] });
});

module.exports = router;
