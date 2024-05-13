#!/usr/bin/node
const fs = require('fs');
const filepath = process.argv[2];

fs.readFile(filepath, 'utf-8', (error, content) => {
  if (error) {
    console.error(error);
    return;
  }
  console.log(content);
});
