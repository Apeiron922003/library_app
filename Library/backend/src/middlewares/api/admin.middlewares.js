const responseHelper = require("../../helper/response.helper");

module.exports = (req, res, next) => {
  const user = req.user;
  if (user.role !== "admin")
    return res
      .status(403)
      .json(responseHelper(403, "Access denied: Admins only"));
  return next();
};
