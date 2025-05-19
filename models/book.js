"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      // Define the relationship between Book and Review
      Book.hasMany(models.Review, { foreignKey: "bookId", as: "reviews" });
    }
  }

  Book.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      genre: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Book",
    }
  );

  return Book;
};
