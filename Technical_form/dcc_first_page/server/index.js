const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Employee = require('./models/employee');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose
  .connect('mongodb://127.0.0.1:27017/employee', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Failed to connect to MongoDB:', err.message));

// Routes

// Register Route
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res.status(400).json({ error: 'User with this email already exists.' });
    }

    const employee = await Employee.create(req.body);
    res.status(201).json({ message: 'Registration successful!', employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const employee = await Employee.findOne({ email });
    if (!employee || employee.password !== password) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    res.status(200).json({ message: 'Login successful!', employee });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
