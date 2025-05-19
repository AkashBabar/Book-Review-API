const { Book, Review } = require("../models");
const { Sequelize, Op } = require("sequelize");

// CREATE BOOK
exports.createBook = async (req, res) => {
  const { title, author, genre, description } = req.body;
  try {
    const book = await Book.create({ title, author, genre, description });
    res.status(201).json(book);
  } catch (err) {
    console.error("Error in createBook:", err);
    res.status(500).json({ message: "Failed to add book", error: err.message });
  }
};

// GET ALL BOOKS (WITH PAGINATION + FILTERS)
exports.getAllBooks = async (req, res) => {
  const { page = 1, limit = 10, author, genre } = req.query;
  const pageNum = parseInt(page);
  const limitNum = parseInt(limit);
  const offset = (pageNum - 1) * limitNum;

  const where = {};
  if (author) where.author = { [Op.iLike]: `%${author}%` };
  if (genre) where.genre = { [Op.iLike]: `%${genre}%` };

  try {
    const books = await Book.findAndCountAll({
      where,
      limit: limitNum,
      offset,
    });
    res.json({
      total: books.count,
      pages: Math.ceil(books.count / limitNum),
      data: books.rows,
    });
  } catch (err) {
    console.error("Error in getAllBooks:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch books", error: err.message });
  }
};

// GET BOOK BY ID (INCLUDES REVIEWS + AVERAGE RATING)
exports.getBookById = async (req, res) => {
  const { id } = req.params;
  try {
    const book = await Book.findByPk(id, {
      include: [
        {
          model: Review,
          as: "reviews",
          attributes: ["id", "userId", "rating", "comment", "createdAt"],
        },
      ],
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    const avgRatingResult = await Review.findOne({
      where: { bookId: id },
      attributes: [[Sequelize.fn("AVG", Sequelize.col("rating")), "avgRating"]],
      raw: true,
    });

    const averageRating = avgRatingResult?.avgRating
      ? parseFloat(avgRatingResult.avgRating).toFixed(2)
      : "0.00";

    res.json({
      ...book.toJSON(),
      averageRating,
    });
  } catch (err) {
    console.error("Error in getBookById:", err);
    res
      .status(500)
      .json({ message: "Failed to fetch book", error: err.message });
  }
};

// SEARCH BOOKS
exports.searchBooks = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: "Search query is required" });
  }

  try {
    const books = await Book.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.iLike]: `%${query}%` } },
          { author: { [Op.iLike]: `%${query}%` } },
        ],
      },
    });

    res.json(books);
  } catch (err) {
    console.error("Error in searchBooks:", err);
    res
      .status(500)
      .json({ message: "Failed to search books", error: err.message });
  }
};
