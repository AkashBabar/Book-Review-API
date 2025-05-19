"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: "userId", as: "user" });
      Review.belongsTo(models.Book, { foreignKey: "bookId", as: "book" });
    }
  }

  Review.init(
    {
      userId: DataTypes.INTEGER,
      bookId: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      comment: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Review",
    }
  );

  return Review;
};
