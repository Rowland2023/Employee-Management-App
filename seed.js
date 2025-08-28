// seed.js
const mongoose = require('mongoose');
const Department = require('./models/Department');

mongoose.connect('mongodb://localhost:27017/employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const sampleDepartments = [
    { name: 'Engineering' },
    { name: 'Marketing' },
    { name: 'Human Resources' },
    { name: 'Finance' },
  ];
  await Department.insertMany(sampleDepartments);
  console.log('✅ Departments seeded');
  mongoose.disconnect();
});
