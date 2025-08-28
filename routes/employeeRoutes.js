const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

// READ: Get all employees
router.get('/', employeeController.getAllEmployees);

// READ: Get a single employee by ID
router.get('/:id', employeeController.getEmployeeById);

// CREATE: Add a new employee
router.post('/', employeeController.createEmployee);

// UPDATE: Update an employee by ID
router.put('/:id', employeeController.updateEmployee);

// DELETE: Remove an employee by ID
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;
