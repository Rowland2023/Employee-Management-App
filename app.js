// app.js
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const Employee = require('./models/Employee');
const Department = require('./models/Department');

const app = express();

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/api/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching departments', error: err });
  }
});

app.post('/api/departments', async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json({ message: 'Department created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating department', error: err });
  }
});

app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find().populate('department');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees', error: err });
  }
});

app.post('/api/employees', async (req, res) => {
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee saved successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error saving employee', error: err });
  }
});

module.exports = app;
