#!/usr/bin/node
const request = require('request');

request.get(`https://swapi-api.hbtn.io/api/films/${process.argv[2]}`, (err, response, body) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(JSON.parse(body).title);
});
