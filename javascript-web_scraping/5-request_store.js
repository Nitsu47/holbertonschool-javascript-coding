#!/usr/bin/node
const request = require('request');
const apiUrl = process.argv[2];

request(apiUrl, function (error, response, body) {
  if (error) {
    console.error(error);
  }
  const toComplete = JSON.parse(body);
  const completeTasks = {};
  toComplete.forEach(function (tasks) {
    if (tasks.completed) {
      if (completeTasks[tasks.userId]) {
        completeTasks[tasks.userId] += 1;
      } else {
        completeTasks[tasks.userId] = 1;
      }
    }
  });
  console.log(completeTasks);
});
