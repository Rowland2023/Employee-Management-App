// seed.js
const mongoose = require('mongoose');
const Department = require('./models/Department');

mongoose.connect('mongodb://localhost:27017/employee', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(async () => {
  const sampleDepartments = [
    { name: 'Engineering' },
    { name: 'Marketing' },
    { name: 'Human Resources' },
    { name: 'Finance' },
  ];

  for (const dept of sampleDepartments) {
    const exists = await Department.findOne({ name: dept.name });
    if (!exists) {
      await Department.create(dept);
      console.log(`✅ Added department: ${dept.name}`);
    } else {
      console.log(`⚠️ Department already exists: ${dept.name}`);
    }
  }

  mongoose.disconnect();
});
