var express = require("express");
const bookController = require("../../controllers/api/books.controller");
const authMiddlewares = require("../../middlewares/api/auth.middlewares");
const adminMiddlewares = require("../../middlewares/api/admin.middlewares");
var router = express.Router();

/* GET books listing. */
router.get("/", bookController.index);
router.post("/", authMiddlewares, adminMiddlewares, bookController.add);

// Actions a book
router.get("/:id", bookController.get);
// router.put("/:id", bookController.update);
router.patch("/:id", authMiddlewares, adminMiddlewares, bookController.update);
router.delete("/:id", authMiddlewares, adminMiddlewares, bookController.delete);

// Actions loans of a book
router.get(
  "/:id/loans",
  authMiddlewares,
  adminMiddlewares,
  bookController.getLoans
);

module.exports = router;
