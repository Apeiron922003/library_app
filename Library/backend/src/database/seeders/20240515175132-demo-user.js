"use strict";
const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let users = [];
    for (let index = 0; index < 10; index++) {
      const fullname = faker.person.fullName();
      const username = faker.internet.userName();
      const salt = bcrypt.genSaltSync(10);
      const password = bcrypt.hashSync("123456", salt);
      const role = faker.datatype.boolean() ? "admin" : "user";
      users.push({
        full_name: fullname,
        username,
        password,
        role,
        created_at: Sequelize.fn("NOW"),
        updated_at: Sequelize.fn("NOW"),
      });
    }
    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users");
  },
};
