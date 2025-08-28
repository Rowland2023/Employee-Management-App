const mongoose = require('mongoose');
const Department = require('./models/Department');

mongoose.connect('mongodb://localhost:27017/employeeDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const departments = [
  { name: 'HR' },
  { name: 'Engineering' },
  { name: 'Marketing' },
  { name: 'Finance' },
  { name: 'Legal' }
];

async function seed() {
  await Department.deleteMany({});
  await Department.insertMany(departments);
  console.log('✅ Departments seeded');
  mongoose.disconnect();
}

seed();
