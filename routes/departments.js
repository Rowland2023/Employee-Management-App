const express = require('express');
const router = express.Router();

const departments = [
  { id: 1, name: 'Engineering' },
  { id: 2, name: 'Marketing' },
  { id: 3, name: 'Human Resources' },
  { id: 4, name: 'Finance' },
];

router.get('/', (req, res) => {
  res.status(200).json(departments);
});

module.exports = router;
