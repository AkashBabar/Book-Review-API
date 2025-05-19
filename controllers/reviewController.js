const { Review } = require("../models");

exports.addReview = async (req, res) => {
  const userId = req.user.id;
  const bookId = req.params.id;
  const { rating, comment } = req.body;

  try {
    // Check if user already reviewed this book
    const existingReview = await Review.findOne({ where: { userId, bookId } });
    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this book." });
    }

    const review = await Review.create({ userId, bookId, rating, comment });
    res.status(201).json(review);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add review", error: err.message });
  }
};

exports.updateReview = async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.id;
  const { rating, comment } = req.body;

  try {
    const review = await Review.findByPk(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can update only your own review" });
    }

    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    res.json(review);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update review", error: err.message });
  }
};

exports.deleteReview = async (req, res) => {
  const userId = req.user.id;
  const reviewId = req.params.id;

  try {
    const review = await Review.findByPk(reviewId);
    if (!review) return res.status(404).json({ message: "Review not found" });

    if (review.userId !== userId) {
      return res
        .status(403)
        .json({ message: "You can delete only your own review" });
    }

    await review.destroy();
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete review", error: err.message });
  }
};
