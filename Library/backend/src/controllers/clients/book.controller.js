const { Book } = require("../../models/index");
module.exports = {
  index: async (req, res) => {
    const books = await Book.findAll();
    console.log("books");
    res.render("books/index", { books, title: "books" });
  },
  detail: async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    res.render("books/detail", { id, title: `books ${id}` });
  },
};
