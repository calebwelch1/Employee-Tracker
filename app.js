const inquirer = require("inquirer");
const mysql = require("mysql");
const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = 8080;
const cTable = require("console.table");
// call once somewhere in the beginning of the app
//takes an object use this later to print out employees
console.table([
  {
    name: "foo",
    age: 10,
  },
  {
    name: "bar",
    age: 20,
  },
]);
// prints
// name  age
// ----  ---
// foo   10
// bar   20

// mysql connection
const mySqlConnect = mysql.createConnection({
  host: "localhost",
  Port: 3737,
  user: "root",
  password: "",
  database: "employees_db",
});

app.listen(PORT, (x) => {
  console.log(`Listening on Port${PORT}`);
});
// Inquirer
inquirer
  .prompt([
    {
      type: "list",
      name: "start",
      message: "What do you want to do?",
      choices: [
        "View Employees",
        "Add An Employee",
        "Remove An Employee",
        "Update An Employee",
        new inquirer.Separator(),
        "Configure Titles",
        "Configure Departments",
      ],
    },
  ])
  .then((answers) => {
    // view all employees
    if (answers.start == "View Employees") {
      console.table();
    }
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
