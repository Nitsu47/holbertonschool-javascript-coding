const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const lines = data.split('\n').filter((line) => line.trim() !== '' && !line.startsWith('firstname'));
    const counters = {};

    lines.forEach((line) => {
      const [firstName, , , field] = line.split(',');
      if (field) {
        if (!counters[field]) {
          counters[field] = [];
        }
        counters[field].push(firstName.trim());
      }
    });

    console.log(`Number of students: ${lines.length}`);
    Object.entries(counters).forEach(([field, names]) => {
      console.log(`Number of students in ${field}: ${names.length}. List: ${names.join(', ')}`);
    });
  } catch (err) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
