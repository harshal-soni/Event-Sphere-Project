const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb+srv://Adminharshal:eventkarry@clusterevent.hpvlgbh.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Test Route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend & Database Connected Successfully!' });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


// Import the model
const Manager = require('./manager');

// Handle POST request
app.post('/api/register', async (req, res) => {
  try {
    const newManager = new Manager({
      name: req.body.name,
      email: req.body.email,
      location: req.body.location
    });

    await newManager.save();
    res.status(200).json({ message: 'Manager registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error registering manager' });
  }
});


// Get managers by location
app.get('/api/managers', async (req, res) => {
  const { location } = req.query;

  try {
    const managers = await Manager.find({ location: location });
    res.json(managers);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching managers' });
  }
});