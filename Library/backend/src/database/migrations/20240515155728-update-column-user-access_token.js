"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn("users", "access_token", "refresh_token");
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.renameColumn("users", "refresh_token", "access_token");
  },
};
