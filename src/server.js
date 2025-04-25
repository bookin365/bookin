const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/salonDB').then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('MongoDB connection error:', err);
});

const salonSchema = new mongoose.Schema({
  name: String,
  city: String,
  rating: Number,
});

const Salon = mongoose.model('Salon', salonSchema);

app.get('/api/salons', async (req, res) => {
  try {
    const salons = await Salon.find({});
    res.json(salons);
  } catch (err) {
    console.error('Error fetching salons:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});