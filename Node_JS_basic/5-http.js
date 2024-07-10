/* eslint-disable */
const http = require('http');
const url = require('url');
const fs = require('fs').promises;

function countStudents(path) {
  return fs
    .readFile(path, 'utf8')
    .then((data) => {
      const rows = data.split('\n').filter((row) => row);
      const heads = rows.shift().split(',');
      const fieldIdx = heads.indexOf('field');
      const fNameIndex = heads.indexOf('firstname');
      const fields = [
        ...new Set(rows.map((row) => row.split(',')[fieldIdx])),
      ];
      let result = `Number of students: ${rows.length}\n`;

      fields.forEach((field) => {
        const students = rows.filter(
          (row) => row.split(',')[fieldIdx] === field
        );
        result += `Number of students in ${field}: ${
          students.length
        }. List: ${students
          .map((student) => student.split(',')[fNameIndex])
          .join(', ')}\n`;
      });
      return result;
    })
    .catch(() => {
      throw new Error('Cannot load the database');
    });
}
const app = http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    const q = url.parse(req.url, true).pathname;

    if (q === '/') {
      res.end('Hello Holberton School!');
    } else if (q === '/students') {
      res.write('This is the list of our students\n');
      countStudents(process.argv[2])
        .then((data) => {
          res.write(data);
          res.end();
        })
        .catch((error) => {
          res.write(error.message);
          res.end();
        });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    }
  })
  .listen(1245);

module.exports = app;
