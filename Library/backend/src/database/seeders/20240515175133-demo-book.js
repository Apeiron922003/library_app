"use strict";
const { faker } = require("@faker-js/faker");
const fs = require("fs");
const path = require("path");

const data = fs.readFileSync(
  path.resolve(__dirname + "../../../../core/Book/Book.json"),
  "utf8"
);
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let books = [];
    await JSON.parse(data).forEach(async (book) => {
      const name = book.title;
      const imagePath = path.resolve(
        __dirname + "../../../../core/Book/covers",
        name + ".jpg"
      );
      let cover;
      if (fs.existsSync(imagePath)) {
        cover = fs.readFileSync(imagePath);
      } else {
        cover = null;
      }
      const extend = {
        cover,
        number_of_copies: faker.number.int({ min: 30, max: 50 }),
        copies_available: faker.number.int({ min: 0, max: 30 }),
        created_at: Sequelize.fn("NOW"),
        updated_at: Sequelize.fn("NOW"),
      };
      Object.assign(book, extend);
      books.push(book);
    });

    await queryInterface.bulkInsert("books", books, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("books");
  },
};
