const express = require("express");
const app = express();
app.use(express.json());

app.use(express.static(__dirname + "/public"));
app.use(express.json());

const { MongoClient } = require("mongodb");
const MONGODB_URI = "mongodb+srv://user1:mongo%40123@hades.5ef5z.mongodb.net/techrev?retryWrites=true&w=majority";

// to make a mongodb client
const mongoClient = new MongoClient(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// connect to the mongodb database
mongoClient.connect((err) => {
  if (err) throw err;
  console.log("Database connected");
});

// To Post to users collection
let usersCollection;
app.post("/api/users", (req, res) => {
  usersCollection = mongoClient.db("techrev").collection("users");
  usersCollection.insertOne(req.body, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({
      success: true,
      message: "Your account has been created",
    });
  });
});

// To Post to reviews collection
let reviewsCollection;
app.post("/api/reviews", (req, res) => {
  usersCollection = mongoClient.db("techrev").collection("reviews");
  usersCollection.insertOne(req.body, (err) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json({
      success: true,
      message: "Your review has been posted",
    });
  });
});

const port = 8080;
app.listen(port, () => {
  console.log("Running on port: " + port);
});
