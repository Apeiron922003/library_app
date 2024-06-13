const { User } = require("../../models/index");
module.exports = {
  index: async (req, res) => {
    const users = await User.findAll();
    res.render("users/index", { users, title: "users" });
  },
  detail: async (req, res) => {
    const { id } = req.params;
    const user = await User.findByPk(id);
    res.render("users/detail", { user, title: `users ${id}` });
  },
};
