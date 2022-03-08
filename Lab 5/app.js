//Import the express module
const express = require('express');

//Create an instance of express 
const app = express();
const configRoutes = require('./routes');

configRoutes(app);

app.listen(3000, () => {
  console.log("Server is connected!");
  console.log('All routes will be running on http://localhost:3000');
});