// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const dataRoute = require('./routes/data');
const countRoute = require('./routes/count');
const entriesRoute = require('./routes/entries'); // Add this line

const app = express();
const port = 8000;

// MongoDB connection
mongoose.connect('mongodb+srv://anandkr:Anand123@datastore.cwu00t2.mongodb.net/datastore', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api/data', dataRoute);
app.use('/api/count', countRoute);
app.use('/api/entries', entriesRoute); // Add this line

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
