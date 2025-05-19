const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const {
  createBook,
  getAllBooks,
  getBookById,
  searchBooks,
} = require("../controllers/bookController");

router.post("/books", auth, createBook);
router.get("/books", getAllBooks);
router.get("/search", searchBooks);
router.get("/books/:id", getBookById);

module.exports = router;
