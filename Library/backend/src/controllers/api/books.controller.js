const { Op, where } = require("sequelize");
const responseHelper = require("../../helper/response.helper");
const { Book, Loan } = require("../../models/index");

module.exports = {
  index: async (req, res) => {
    try {
      // Lấy các query parameters từ request
      const {
        title,
        author,
        publisher,
        release_year,
        page = 1,
        limit = 10,
      } = req.query;
      // Tạo điều kiện tìm kiếm
      const searchConditions = {};
      if (title) {
        searchConditions.title = { [Op.like]: `%${title}%` };
      }
      if (author) {
        searchConditions.author = { [Op.like]: `%${author}%` };
      }
      if (publisher) {
        searchConditions.publisher = { [Op.like]: `%${publisher}%` };
      }
      if (release_year) {
        searchConditions.release_year = release_year;
      }
      const offset = (page - 1) * limit;
      const books = await Book.findAll({
        where: searchConditions,
        limit: parseInt(limit),
        offset: parseInt(offset),
        order: [["title", "ASC"]],
      });
      return res.status(200).json(responseHelper(200, books));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },

  get: async (req, res) => {
    const { id } = req.params;
    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json(responseHelper(404, "Book not found!"));
      } else {
        return res.status(200).json(responseHelper(200, book));
      }
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
  add: async (req, res) => {
    const body = req.body;
    if (!body) return res.status(400).json(responseHelper(400));
    try {
      const book = await Book.create(body);
      return res.status(201).json(responseHelper(201, book));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
  update: async (req, res) => {
    const { id } = req.params;
    const body = req.body;
    if (!body) return res.status(400).json(responseHelper(400));
    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json(responseHelper(404, "Book not found!"));
      } else {
        await book.update(body);
        await book.save();
        return res.status(202).json(responseHelper(202, book));
      }
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
  delete: async (req, res) => {
    const { id } = req.params;
    try {
      const book = await Book.findByPk(id);
      if (!book) {
        return res.status(404).json(responseHelper(404, "Book not found!"));
      } else {
        await book.destroy();
        return res.status(204).json(responseHelper(204));
      }
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },

  getLoans: async (req, res) => {
    const { id } = req.params;
    try {
      const loans = await Loan.findAll({ where: { book_id: id } });
      return res.status(200).json(responseHelper(200, loans));
    } catch (error) {
      return res.status(500).json(responseHelper(500, error.message));
    }
  },
};
