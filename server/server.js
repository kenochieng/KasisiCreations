// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');

// Load environment variables
dotenv.config();

// Initialize app
const app = express();

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(express.json()); // Middleware to parse JSON request bodies
 // Parse JSON request bodies

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Test Route
app.get('/', (req, res) => {
  res.send('Backend is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

//UserRoutes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes); // Mount user routes

 // Mount order routes
const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

console.log('User routes mounted at /api/users');
console.log('Order routes mounted at /api/orders');



