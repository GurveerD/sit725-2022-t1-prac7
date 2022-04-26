const express = require("express");
const app = express();
app.use(express.json());

// For the public route 
app.use(express.static(__dirname + "/public"));
app.use(express.json());

//Middleware to parse the body for post requests
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Routing 
app.use('/api/account', require('./routes/account'));
app.use('/api/review', require('./routes/review'));

// Running the server
const port = 8080;
app.listen(port, () => {
  console.log("Running on port: " + port);
});
