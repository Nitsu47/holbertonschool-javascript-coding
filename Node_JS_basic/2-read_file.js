const fs = require('fs');

function countStudents(path) {
  try {
    const data = fs.readFileSync(path, 'utf-8');
    const lines = data.trim().split('\n').filter(line => line.trim() !== '');

    if (lines.length === 0) {
      throw new Error('Cannot load the database');
    }

    const studentLines = lines.slice(1);

    console.log(`Number of students: ${studentLines.length}`);

    const fields = {
      CS: { count: 0, list: [] },
      SWE: { count: 0, list: [] }
    };

    studentLines.forEach(line => {
      const [firstname, lastname, age, field] = line.split(',');
      if (fields[field]) {
        fields[field].count++;
        fields[field].list.push(firstname);
      }
    });

    Object.keys(fields).forEach(field => {
      console.log(`Number of students in ${field}: ${fields[field].count}. List: ${fields[field].list.join(', ')}`);
    });
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}

module.exports = countStudents;
