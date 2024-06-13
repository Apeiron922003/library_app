const client = require("../../utils/client");

// const { User } = require("../../models/index");
module.exports = {
  index: (req, res) => {
    res.render("index", { title: "library app" });
  },
  login: (req, res) => {
    res.render("login", { title: `login` });
  },
  handleLogin: async (req, res) => {
    const body = req.body;
    if (body) {
      try {
        const { response, data } = await client.post("/auth/login", body);
        if (data.status === 200) {
          client.setToken(data.data.access_token);
          return res.redirect("/");
        } else {
          return res.redirect("/register");
        }
      } catch (error) {
        console.log(error);
      }
    }

    return res.redirect("/");
  },
  register: (req, res) => {
    res.render("register", { title: `register` });
  },
  handleRegister: async (req, res) => {
    const body = req.body;
    try {
      const user = await client.post("/auth/register", body);
      if (user) {
        return res.redirect("login");
      } else return res.redirect("/register");
    } catch (error) {
      console.log(error.message);
    }
  },
};
