const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Department schema and model
const departmentSchema = new mongoose.Schema({
  name: { type: String, required: true }
});
const Department = mongoose.model('Department', departmentSchema);

// Define Employee schema and model
const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  birthDate: { type: Date, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department', required: true }
});
const Employee = mongoose.model('Employee', employeeSchema);

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// GET departments
app.get('/api/departments', async (req, res) => {
  try {
    const departments = await Department.find();
    res.json(departments);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching departments', error: err });
  }
});

// POST new department
app.post('/api/departments', async (req, res) => {
  try {
    const department = new Department(req.body);
    await department.save();
    res.status(201).json({ message: 'Department created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error creating department', error: err });
  }
});

// POST new employee
app.post('/api/employees', async (req, res) => {
  console.log('Incoming employee data:', req.body);
  try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json({ message: 'Employee saved successfully' });
  } catch (err) {
    console.error('Error saving employee:', err);
    res.status(500).json({ message: 'Error saving employee', error: err });
  }
});

// GET all employees
app.get('/api/employees', async (req, res) => {
  try {
    const employees = await Employee.find().populate('department');
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching employees', error: err });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
