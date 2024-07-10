const http = require('http');
const { countStudents } = require('./3-read_file_async');

const app = http.createServer(async (req, res) => {
  res.setHeader('Content-Type', 'text/plain');
  
  if (req.url === '/') {
    res.end('Hello Holberton School!');
  } else if (req.url === '/students') {
    try {
      const studentData = await countStudents('database.csv');
      res.write('This is the list of our students\n');
      res.end(studentData);
    } catch (error) {
      console.error('Error retrieving student data:', error);
      res.statusCode = 500;
      res.end('Error retrieving student data');
    }
  } else {
    res.statusCode = 404;
    res.end('404 Not Found');
  }
});

const PORT = 1245;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

module.exports = app;
