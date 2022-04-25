const { mongoClient } = require('./db');

const accountCollection = mongoClient.db('techrev').collection('users');

// Get all reviews
const getAll = (res) => {
    reviewCollection.find().toArray((err, result) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json(result);
    });
  };
  
  // Insert a review
  const insert = (data, res) => {
    reviewCollection.insertOne(data, (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({
        success: true,
        message: 'Your message has been sent!',
      });
    });
  };
  
  // Delete a review
  const remove = (id, res) => {
    reviewCollection.deleteOne({ _id: id }, (err) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.json({
        success: true,
        message: 'Review deleted',
      });
    });
  };
  
  module.exports = {
    getAll,
    insert,
    remove,
  };