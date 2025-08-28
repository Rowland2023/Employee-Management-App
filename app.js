// app.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose'); // If you're using MongoDB
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, 'public')));

// Sample department data
const departments = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Marketing' },
  { id: 3, name: 'Human Resources' },
  { id: 4, name: 'Finance' },
];

// API endpoint to get departments
app.get('/api/departments', (req, res) => {
  res.status(200).json(departments);
});

// Define your Employee model (simplified example)
const mongooseSchema = mongoose.Schema({
  name: String,
  dob: String,
  email: String,
  phone: String,
  department: String,
});
const Employee = mongoose.model('Employee', mongooseSchema);

// API endpoint to save employee data
app.post('/api/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving employee', error: err });
  }
});

// Connect to MongoDB (update with your URI)
mongoose.connect('mongodb://localhost:27017/employeesDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
