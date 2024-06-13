const responseHelper = require("../../helper/response.helper");
const { Loan, Book } = require("../../models/index");

module.exports = {
  index: async (req, res) => {
    const user = req.user;
    const condition = {};
    try {
      if (user.role === "user") condition.user_id = user.id;
      const loans = await Loan.findAll({
        where: condition,
        include: {
          model: Book,
          require: true,
        },
      });
      return res.status(200).json(responseHelper(200, loans));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
  get: async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    try {
      const loan = await Loan.findByPk(id);
      if (!loan) return res.status(404).json(responseHelper(404));
      if (user.id !== loan.user_id || user.role !== "admin")
        return res.status(403).json(responseHelper(403));
      return res.status(200).json(responseHelper(200, loan));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
  add: async (req, res) => {
    const user = req.user;
    const body = req.body;
    if (!body) return res.status(400).json(responseHelper(400));
    try {
      const isExist = await Loan.findOne({ where: { book_id: body.book_id } });
      if (isExist)
        return res
          .status(400)
          .json(responseHelper(400, "This book was borrowed."));
      // Hạn trả sách
      const currentTime = new Date();
      const dueTime = new Date(currentTime);
      dueTime.setDate(currentTime.getDate() + +body.due_time);
      body.due_at = dueTime;
      if (user.role === "user") body.user_id = user.id;
      const loan = await Loan.create(body);
      return res.status(201).json(responseHelper(201, loan));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
  update: async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    const body = req.body;
    if (!body)
      return res.status(400).json(responseHelper(400, "Invalid loan value."));
    try {
      const loan = await Loan.findByPk(id);
      if (!loan)
        return res.status(404).json(responseHelper(404, "Loan don't exist."));
      if (user.id !== loan.user_id || user.role !== "admin")
        return res
          .status(403)
          .json(responseHelper(403, "No update permission."));
      await loan.update(body);
      await loan.save();
      return res.status(202).json(responseHelper(202, loan));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
  delete: async (req, res) => {
    const user = req.user;
    const { id } = req.params;
    try {
      const loan = await Loan.findByPk(id);
      if (!loan) return res.status(404).json(responseHelper(404));
      if (user.id !== loan.user_id || user.role !== "admin")
        return res.status(403).json(responseHelper(403));
      await loan.destroy();
      return res.status(204).json(responseHelper(204));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
};
