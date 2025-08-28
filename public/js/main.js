document.addEventListener('DOMContentLoaded', () => {
  const departmentSelect = document.getElementById('department-select');
  const form = document.getElementById('employee-form');
  const employeeList = document.getElementById('employee-list'); // Optional: for rendering

  if (!departmentSelect) {
    console.error('Department select element not found.');
    return;
  }

  if (!form) {
    console.error('Employee form not found.');
    return;
  }

  // 🔹 Load departments from API
  fetch('/api/departments')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(departments => {
      console.log('Fetched departments:', departments);
      if (!Array.isArray(departments) || departments.length === 0) {
        console.warn('No departments found.');
        return;
      }

      departments.forEach(({ _id, name }) => {
        const option = document.createElement('option');
        option.value = _id;
        option.textContent = name;
        departmentSelect.appendChild(option);
      });
    })
    .catch(error => {
      console.error('Error fetching departments:', error);
    });

  // 🔹 Handle form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      firstName: form.firstName.value.trim(),
      lastName: form.lastName.value.trim(),
      birthDate: form.birthDate.value,
      email: form.email.value.trim(),
      phoneNumber: form.phoneNumber.value.trim(),
      department: departmentSelect.value
    };

    console.log('Form data being submitted:', formData);

    try {
      const response = await fetch('/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        alert('✅ Employee added successfully!');
        form.reset();
        departmentSelect.selectedIndex = 0;
        loadEmployees(); // Refresh list after adding
      } else {
        const error = await response.json();
        alert('❌ Error: ' + error.message);
      }
    } catch (err) {
      console.error('Submission failed:', err);
      alert('🚨 Something went wrong. Please try again.');
    }
  });

  // 🔹 Load employees and render
  function loadEmployees() {
    fetch('/api/employees')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        console.log('Fetched employees:', data);
        if (employeeList) {
          employeeList.innerHTML = ''; // Clear existing
          data.forEach(emp => {
            const li = document.createElement('li');
            li.textContent = `${emp.firstName} ${emp.lastName} (${emp.email})`;
            employeeList.appendChild(li);
          });
        }
      })
      .catch(err => console.error('Error fetching employees:', err));
  }

  // Initial load
  loadEmployees();
});
