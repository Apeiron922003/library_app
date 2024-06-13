const { object, string } = require("yup");

module.exports = {
  register: object({
    full_name: string().min(6, "muse be least 6 characters long").required(),
    username: string().min(6).max(30).required(),
    password: string().min(6).max(30).required(),
  }),
};
