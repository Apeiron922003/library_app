const express = require("express");
const usersController = require("../../controllers/api/users.controller");
const authMiddlewares = require("../../middlewares/api/auth.middlewares");
const adminMiddlewares = require("../../middlewares/api/admin.middlewares");
const router = express.Router();

/* GET users listing. */
router.get("/", authMiddlewares, adminMiddlewares, usersController.index);
router.post("/", authMiddlewares, usersController.add);

// Actions a user
router.get("/:id", authMiddlewares, adminMiddlewares, usersController.get);
// router.put("/:id", usersController.update);
router.patch("/:id", authMiddlewares, adminMiddlewares, usersController.update);
router.delete(
  "/:id",
  authMiddlewares,
  adminMiddlewares,
  usersController.delete
);

// Actions loans of a user
router.get(
  "/:id/loans",
  authMiddlewares,
  adminMiddlewares,
  usersController.getLoans
);

module.exports = router;
