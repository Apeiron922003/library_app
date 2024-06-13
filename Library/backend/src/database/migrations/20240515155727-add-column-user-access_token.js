"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "access_token", {
      type: Sequelize.STRING(100),
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("users", "access_token");
  },
};
