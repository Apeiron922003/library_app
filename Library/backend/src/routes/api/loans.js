var express = require("express");
const loansController = require("../../controllers/api/loans.controller");
const authMiddlewares = require("../../middlewares/api/auth.middlewares");
var router = express.Router();

/* GET loans listing. */
router.post("/", authMiddlewares, loansController.add);
router.get("/", authMiddlewares, loansController.index);

// Actions a loan
router.get("/:id", authMiddlewares, loansController.get);
// router.put("/:id", loansController.update);
router.patch("/:id", authMiddlewares, loansController.update);
router.delete("/:id", authMiddlewares, loansController.delete);

module.exports = router;
