const express = require('express');
const router = express.Router();
const Department = require('../models/Department'); // Import the Mongoose model

// --- GET all departments ---
// GET /api/departments
// This endpoint fetches all department documents from the database.
router.get('/', async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json(departments);
  } catch (error) {
    // Return a 500 error if something goes wrong with the database query
    console.error('Error fetching departments:', error.message);
    res.status(500).json({ error: 'Failed to fetch departments' });
  }
});

// --- GET a single department by ID ---
// GET /api/departments/:id
// This endpoint fetches a single department by its unique ID.
router.get('/:id', async (req, res) => {
  try {
    const department = await Department.findById(req.params.id);
    if (!department) {
      // Return a 404 error if the department is not found
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(department);
  } catch (error) {
    // Return a 500 error for invalid ID format or other issues
    console.error('Error fetching department:', error.message);
    res.status(500).json({ error: 'Failed to fetch department' });
  }
});

// --- CREATE a new department ---
// POST /api/departments
// This endpoint creates a new department document.
router.post('/', async (req, res) => {
  try {
    const newDepartment = new Department({
      name: req.body.name, // Assuming the name is sent in the request body
      description: req.body.description,
      // Add other relevant fields here
    });

    const savedDepartment = await newDepartment.save();
    // Return the newly created document with a 201 status code
    res.status(201).json(savedDepartment);
  } catch (error) {
    // Return a 400 error for validation issues
    console.error('Error creating department:', error.message);
    res.status(400).json({ error: 'Failed to create department', details: error.message });
  }
});

// --- UPDATE an existing department ---
// PUT /api/departments/:id
// This endpoint updates an existing department by its ID.
router.put('/:id', async (req, res) => {
  try {
    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.id,
      req.body, // The update data is in the request body
      { new: true, runValidators: true } // Return the updated document and run Mongoose validators
    );

    if (!updatedDepartment) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json(updatedDepartment);
  } catch (error) {
    console.error('Error updating department:', error.message);
    res.status(400).json({ error: 'Failed to update department', details: error.message });
  }
});

// --- DELETE a department ---
// DELETE /api/departments/:id
// This endpoint deletes a department by its ID.
router.delete('/:id', async (req, res) => {
  try {
    const deletedDepartment = await Department.findByIdAndDelete(req.params.id);
    if (!deletedDepartment) {
      return res.status(404).json({ error: 'Department not found' });
    }
    res.status(200).json({ message: 'Department deleted successfully' });
  } catch (error) {
    console.error('Error deleting department:', error.message);
    res.status(500).json({ error: 'Failed to delete department' });
  }
});

module.exports = router;
