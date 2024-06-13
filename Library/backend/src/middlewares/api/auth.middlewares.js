const responseHelper = require("../../helper/response.helper");
const { User, BlackList } = require("../..//models/index");
const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const access_token = req.get("Authorization")?.split(" ")[1];
  if (!access_token) {
    return res.status(401).json(responseHelper(401));
  }

  try {
    const token = await BlackList.findOne({ where: { token: access_token } });
    if (token) return res.status(403).json(responseHelper(403));
    const { user_id, exp } = jwt.verify(access_token, process.env.JWT_SECRET);

    const user = await User.findByPk(user_id, {
      attributes: {
        exclude: ["password", "refresh_token"],
      },
    });

    if (!user) return res.status(401).json(responseHelper(401));
    req.user = {
      ...user.dataValues,
      access_token,
      expired: new Date(exp * 1000),
    };
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json(responseHelper(401, error.message));
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json(responseHelper(401, error.message));
    }
    return res.status(500).json(responseHelper(500, error.message));
  }
};
