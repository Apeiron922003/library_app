const responseHelper = require("../../helper/response.helper");
const { User, Loan } = require("../../models/index");
const bcrypt = require("bcryptjs");

module.exports = {
  index: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: { exclude: ["password", "access_token"] },
      });
      return res.status(200).json(responseHelper(200, users));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },

  get: async (req, res) => {
    try {
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password", "access_token"] },
      });
      if (!user) return res.status(404).json(responseHelper(404));
      return res.status(200).json(responseHelper(200, user));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
  add: async (req, res) => {
    const body = req.body;
    if (!body) return res.status(400).json(responseHelper(400));
    try {
      const hash = bcrypt.hashSync(body.password);
      body.password = hash;
      const user = await User.create(body, {
        attributes: { exclude: ["password", "access_token"] },
      });
      return res.status(201).json(responseHelper(201, user));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
  update: async (req, res) => {
    try {
      const { id } = req.params;
      const body = req.body;
      if (!body) return res.status(400).json(responseHelper(400));
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password", "access_token"] },
      });
      if (!user) return res.status(404).json(responseHelper(404));
      await user.update(body);
      await user.save();
      return res.status(202).json(responseHelper(202, user));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
  delete: async (req, res) => {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password", "access_token"] },
      });
      if (!user) return res.status(404).json(responseHelper(404));
      await user.destroy();
      return res.status(204).json(responseHelper(204));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },

  getLoans: async (req, res) => {
    const { id } = req.params;
    try {
      const loans = await Loan.findAll({ where: { user_id: id } });
      return res.status(200).json(responseHelper(200, loans));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
};
