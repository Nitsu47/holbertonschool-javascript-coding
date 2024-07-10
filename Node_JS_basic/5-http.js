/* eslint-disable */
const http = require('http');
const url = require('url');
const fs = require('fs').promises;

async function countStudents(path) {
  try {
    const data = await fs.readFile(path, 'utf8');
    const rows = data.split('\n').filter((row) => row);
    const headers = rows.shift().split(',');
    const fieldIndex = headers.indexOf('field');
    const firstNameIndex = headers.indexOf('firstname');
    const fields = [...new Set(rows.map((row) => row.split(',')[fieldIndex]))];

    let result = `Number of students: ${rows.length}\n`;

    fields.forEach((field) => {
      const students = rows.filter((row) => row.split(',')[fieldIndex] === field);
      result += `Number of students in ${field}: ${students.length}. List: ${students.map((student) => student.split(',')[firstNameIndex]).join(', ')}\n`;
    });

    return result;
  } catch {
    throw new Error('Cannot load the database');
  }
}

const app = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  const path = url.parse(req.url, true).pathname;

  if (path === '/') {
    res.end('Hello Holberton School!');
  } else if (path === '/students') {
    res.write('This is the list of our students\n');
    try {
      const data = await countStudents(process.argv[2]);
      res.end(data);
    } catch (error) {
      res.end(error.message);
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

app.listen(1245, () => {
  console.log('Server listening on port 1245');
});

module.exports = app;
