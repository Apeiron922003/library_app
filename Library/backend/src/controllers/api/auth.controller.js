const responseHelper = require("../../helper/response.helper");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validate = require("../../utils/validate");
const { BlackList, User } = require("../../models/index");
module.exports = {
  login: async (req, res) => {
    const body = req.body;
    if (!body?.username || !body?.password) {
      return res
        .status(400)
        .json(responseHelper(400, "Account/Password must not be empty!"));
    }

    try {
      const { username, password } = body;
      const user = await User.findOne({
        where: { username: username },
      });

      if (!user)
        return res
          .status(400)
          .json(responseHelper(400, "Username/Password is incorrect."));

      const result = bcrypt.compareSync(password, user.password);
      if (!result)
        return res
          .status(400)
          .json(responseHelper(400, "Username/Password is incorrect."));

      const { JWT_SECRET, JWT_EXPIRE, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRE } =
        process.env;
      const access_token = jwt.sign({ user_id: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
      });
      const refresh_token = jwt.sign({ user_id: user.id }, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRE,
      });
      await user.update({ refresh_token });
      return res
        .status(200)
        .json(responseHelper(200, { access_token, refresh_token }));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
  register: async (req, res) => {
    const body = req.body;
    if (!body) return res.status(400).json(responseHelper(400));
    try {
      const userData = await validate.register.validate(body);
      if (userData.password !== body.rePassword)
        throw new Error("Password incorrect!");

      const profile = await User.findOne({
        where: { username: body.username },
      });
      if (profile)
        return res.status(400).json(responseHelper(400, "User was exist"));
      const hash = bcrypt.hashSync(body.password);
      body.password = hash;
      const user = await User.create(body);
      if (!user) return res.status(400).json(responseHelper(400));
      const { JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRE } = process.env;

      const refresh_token = jwt.sign(
        { user_id: profile.id },
        JWT_REFRESH_SECRET,
        {
          expiresIn: JWT_REFRESH_EXPIRE,
        }
      );
      await user.update({ refresh_token });
      return res.status(201).json(
        responseHelper(201, {
          id: user.id,
          username: user.username,
          createdAt: user.created_at,
        })
      );
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
  profile: async (req, res) => {
    const user = req?.user;
    delete user.access_token;
    delete user.expired;
    return res.status(200).json(responseHelper(200, user));
  },
  logout: async (req, res) => {
    const { access_token, expired } = req?.user;
    if (!access_token) return res.status(401).json(responseHelper(401));
    try {
      await BlackList.findOrCreate({
        where: { token: access_token },
        defaults: {
          token: access_token,
          expired,
        },
      });
      return res.status(200).json(responseHelper(200));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
  refresh: async (req, res) => {
    let refresh_token = req.get("Authorization").split(" ")[1];
    if (!refresh_token) return res.status(401).json(responseHelper(401));
    try {
      const { JWT_SECRET, JWT_EXPIRE, JWT_REFRESH_SECRET, JWT_REFRESH_EXPIRE } =
        process.env;
      jwt.verify(refresh_token, JWT_REFRESH_SECRET);
      const user = await User.findOne({ where: { refresh_token } });
      if (!user) return res.status(401).json(responseHelper(401));
      const access_token = jwt.sign({ user_id: user.id }, JWT_SECRET, {
        expiresIn: JWT_EXPIRE,
      });
      refresh_token = jwt.sign({ user_id: user.id }, JWT_REFRESH_SECRET, {
        expiresIn: JWT_REFRESH_EXPIRE,
      });
      await user.update({ refresh_token });
      return res
        .status(200)
        .json(responseHelper(200, { access_token, refresh_token }));
    } catch (error) {
      return res.status(401).json(responseHelper(401, error.message));
    }
  },
};
