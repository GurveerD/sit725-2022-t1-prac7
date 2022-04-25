const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.get('/', reviewController.getAllReview);
router.post('/', reviewController.insertReview);
router.delete('/:id', reviewController.deleteReview);

module.exports = router;