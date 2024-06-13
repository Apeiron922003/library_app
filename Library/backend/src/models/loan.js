"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Loan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Loan.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Loan.belongsTo(models.Book, {
        foreignKey: "book_id",
      });
    }
  }
  Loan.init(
    {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      book_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
      due_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      return_at: {
        type: DataTypes.DATE,
        defaultValue: null,
      },
    },
    {
      sequelize,
      modelName: "Loan",
      tableName: "loans",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Loan;
};
