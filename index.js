require('dotenv').config();
const connectToMongo = require('./db');
const express = require('express');
const cors = require('cors');
const path = require('path');

connectToMongo();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Available Routes
// One Route for each (Player, Team, Round)
app.use('/api/player', require('./routes/player'));
app.use('/api/team', require('./routes/team'));
app.use('/api/round', require('./routes/round'));

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('frontend/build'));

  // Catch all routes and return index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
}

app.get('/api/*', (req, res) => {
  res.status(404).send({ message: 'API endpoint not found' });
});

app.listen(port, () => {
  console.log(`NPL Draft backend listening at ${port}`);
});
