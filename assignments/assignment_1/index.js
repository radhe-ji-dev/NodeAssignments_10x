function getNameFromCommandLine() {
  // Write you code here, name should be taken as args in process.argv
  let firstName = process.argv;

  l = firstName.length;
  return firstName[l - 1];
}

function getNameFromEnv() {
  // Write your code here
  envName = process.env.name;
  return envName;
}

function getNameFromReadLine() {
  // Write your code here
  var readline = require("readline");

  var rl = readline.createInterface(process.stdin, process.stdout);
  rl.question(" ", (age) => {
    console.log(age);
    rl.close();
  });
}

module.exports = {
  getNameFromCommandLine,
  getNameFromEnv,
  getNameFromReadLine,
};
