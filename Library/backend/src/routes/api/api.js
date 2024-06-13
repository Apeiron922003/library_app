var express = require("express");
const booksApi = require("./books");
const usersApi = require("./users");
const loansApi = require("./loans");
const authApi = require("./auth");
var router = express.Router();

/* GET auth API. */

router.use("/auth", authApi);

/* GET api listing. */

router.use("/books", booksApi);
router.use("/users", usersApi);
router.use("/loans", loansApi);

module.exports = router;
