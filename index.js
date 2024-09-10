const express = require('express');
const app = express();
const urlRoutes = require('./routes/url');
const URL = require('./model/url');
const { ConnectToMongo } = require('./connect');
const port = 8001;

// Middleware to parse JSON
app.use(express.json());

ConnectToMongo('mongodb://127.0.0.1:27017/short-url')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Error connecting to MongoDB', err));

app.use('/url', urlRoutes);

app.get('/:shortID', async (req, res) => {
  const shortID = req.params.shortID;
  
  // Get the user's IP address
  const ipAddress = req.headers['x-forwarded-for'] || req.ip;
  // Get the user's User-Agent
  const userAgent = req.headers['user-agent'];

  const entry = await URL.findOneAndUpdate(
    { shortID },
    {
      $push: {
        visitHistory: {
          timeStamp: Date.now(),
          ipAddress: ipAddress,
          userAgent: userAgent
        }
      },
      $inc: { clicks: 1 },  // Increment the clicks counter
    },
    { new: true }  // Return the updated document
  );

  // Handle the case where the entry is not found
  if (!entry) {
    return res.status(404).json({ error: 'Short URL not found' });
  }

  res.redirect(entry.redirectURL);
});

app.listen(port, () => {
  console.log(`Server started at ${port}`);
});
