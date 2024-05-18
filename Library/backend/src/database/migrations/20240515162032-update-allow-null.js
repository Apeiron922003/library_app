"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "created_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn("users", "updated_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn("books", "created_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn("books", "updated_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn("loans", "created_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
    await queryInterface.changeColumn("loans", "updated_at", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn("users", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("users", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("books", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("books", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("loans", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
    await queryInterface.changeColumn("loans", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
    });
  },
};
