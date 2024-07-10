#!/usr/bin/node
const request = require('request');

const url = process.argv[2];
let count = 0;

request(url, (err, res, body) => {
  if (err) {
    console.log(err);
    return;
  }
  const movies = JSON.parse(body).results;
  for (const film of movies) {
    for (const character of film.characters) {
      if (character.endsWith('/18/')) {
        count++;
      }
    }
  }
  console.log(count);
});
