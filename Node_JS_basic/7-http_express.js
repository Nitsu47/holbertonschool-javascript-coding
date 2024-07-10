/* eslint-disable */
const express = require('express');
const fs = require('fs').promises;

const app = express();
const port = 1245;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const row = data.split('\n').filter((row) => row.trim() !== '');
    const headers = row.shift().split(',');
    const fieldIdx = headers.indexOf('field');
    const fNameIdx = headers.indexOf('firstname');
    const fields = [...new Set(row.map((row) => row.split(',')[fieldIdx]))];

    let result = `Number of students: ${row.length}\n`;

    fields.forEach((field) => {
      const students = row.filter(
        (row) => row.split(',')[fieldIdx] === field
      );
      result += `Number of students in ${field}: ${
        students.length
      }. List: ${students
        .map((student) => student.split(',')[fNameIdx])
        .join(', ')}\n`;
    });
    return result;
  } catch (error) {
    throw new Error('Cannot load the database');
  }
}
app.get('/', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send('Hello Holberton School!');
});
app.get('/students', async (req, res) => {
  res.set('Content-Type', 'text/plain');
  try {
    const data = await countStudents(process.argv[2]);
    res.send(`This is the list of our students\n${data}`);
  } catch (err) {
    res.send(`This is the list of our students\n${err.message}`);
  }
});
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;
