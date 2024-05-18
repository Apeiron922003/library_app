"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addConstraint("loans", {
      fields: ["user_id"],
      type: "foreign key",
      name: "foreign_key_loan_user",
      references: {
        table: "users",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
    await queryInterface.addConstraint("loans", {
      fields: ["book_id"],
      type: "foreign key",
      name: "foreign_key_loan_book",
      references: {
        table: "books",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("loans", "foreign_key_loan_user");
    await queryInterface.removeConstraint("loans", "foreign_key_loan_book");
  },
};
