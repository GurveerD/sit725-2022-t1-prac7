const { ObjectId } = require('mongodb');
const reviewService = require('../services/reviewService');

// Get all reviews
const getAllReview = (req, res) => {
  reviewService.getAll(res);
};

// Insert review
const insertReview = (req, res) => {
  reviewService.insert(req.body, res);
};

// Delete review
const deleteReview = (req, res) => {
  const { id } = req.params;
  reviewService.remove(ObjectId(id), res);
};

module.exports = {
  getAllReview,
  insertReview,
  deleteReview,
};