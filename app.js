const pg = require('pg');
const _ = require('underscore');
const rambda = require('rambda');
const rl = require('readline');
const readline = rl.createInterface({
  input: process.stdin,
  output: process.stdout
});

const cs = 'postgres://postgres:pass@localhost:5432/fbd';
const client = new pg.Client(cs);

initialize(client);
process.stdout.write('\033c');
function initialize(client) {
  client.connect();
  showMenu();
}

async function showMenu() {
  while (true) {
    setTimeout(function () {
      console.log('\nSelect menu option: (help)');
    }, 100);
    var response = await userInput();
    switch (response) {
    case 'all':
      await selectAllFrom();
      break;
    case 'help':
      await help();
      break;
    case 'exit':
      await closeConnection();
      process.exit();
    }
  }
};

function closeConnection() {
  client.end();
  return 0;
}

async function selectAllFrom() {
  console.log('Select all from which table?');
  let response = await userInput();
  client.query(`select * from ${response};`).then(res => {
    if (res && res.rows) {
      _.each(res.rows, result => {
        console.log(result);
      });
    };
  }).catch(() => console.log("Error finding results"));
}

function userInput() {
  return new Promise(resolve => {
    readline.question('', answer => {
      return resolve(answer);
    });
  });
}

function help() {
  console.log('\nall:   Selects all data from a table');
  console.log('help:  Help');
  console.log('exit:  Exit');
}
