console.log('Welcome to Holberton School, what is your name?\n');
process.stdin.setEncoding('utf8');
process.stdin.on('data', (data) => {
  const name = data.trim();
  console.log(`Your name is: ${name}\n`);
  console.log('This important software is now closing\n');
  process.exit();
});
