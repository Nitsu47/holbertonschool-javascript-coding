#!/usr/bin/node
const request = require('request');
const apiUrl = process.argv[2];

request(apiUrl, (error, response, body) => {
  if (error) {
    throw error;
  }
  const toComplete = JSON.parse(body);
  const completedTasksByUser = {};

  toComplete.forEach((tasks) => {
    if (tasks.completed) {
      completedTasksByUser[tasks.userId] = (completedTasksByUser[tasks.userId] || 0) + 1;
    }
  });
  console.log(completedTasksByUser);
});
