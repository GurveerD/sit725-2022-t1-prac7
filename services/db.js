const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://user1:mongo%40123@hades.5ef5z.mongodb.net/techrev?retryWrites=true&w=majority';

// Create MongoDB client
const mongoClient = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to MongoDB
mongoClient.connect((err) => {
  if (err) throw err;
  console.log('Database connected');
});

module.exports = { mongoClient };