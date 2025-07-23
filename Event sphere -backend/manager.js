const mongoose = require('mongoose');

const managerSchema = new mongoose.Schema({
  name: String,
  location: String,
  phone: String,
});

module.exports = mongoose.model('Manager', managerSchema);

// Import model
const Manager = require('./manager'); // adjust path if needed

// Route to get managers by location
app.get('/api/managers', async (req, res) => {
  const location = req.query.location;
  try {
    const managers = await Manager.find({ location: location });
    res.json(managers);
  } catch (err) 
    res.status(500).json({ error: 'Server error' });
  
});