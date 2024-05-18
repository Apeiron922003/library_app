"use strict";
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let books = [
      {
        title: "Chăm sóc hành tinh",
        description:
          "Cuốn sách nhỏ này sẽ gieo mầm hướng nghiệp cho bé từ 6 tuổi. Qua việc khuyến khích những đức tính và thói quen tốt mà bé sẵn có, như quan tâm, chăm sóc và để ý đến môi trường xung quanh, cuốn sách sẽ giúp bé hình dung về công việc mơ ước mình muốn làm khi lớn lên, trở thành một người có ích cho xã hội.",
        cover:
          "https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/meoiconsechamsochanhtinh01e171.jpg?v=1713497755137",
        author: "Noodle Juice",
        publisher: "Dân Trí",
        release_year: 2024,
        number_of_copies: faker.number.int({ min: 30, max: 50 }),
        copies_available: faker.number.int({ min: 0, max: 30 }),
      },
    ];

    await queryInterface.bulkInsert("books", books, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("books");
  },
};
