"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Book.hasMany(models.Loan, {
        as: "loans",
      });
    }
  }
  Book.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      cover: {
        allowNull: false,
        type: DataTypes.BLOB,
      },
      author: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      publisher: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      release_year: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      number_of_copies: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      copies_available: {
        allowNull: false,
        type: DataTypes.NUMBER,
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Book",
      tableName: "books",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Book;
};
