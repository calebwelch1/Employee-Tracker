const inquirer = require("inquirer");
const mysql = require("mysql");
const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 8080;
const cTable = require("console.table");
const { start } = require("repl");
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
app.listen(PORT, (x) => {
  console.log(`Listening on Port${PORT}`);
});
// mysql connection
const mySqlConnect = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

mySqlConnect.connect((err) => {
  if (err) {
    throw err;
  }
  beginEmployeeTracker();
});
// Inquirer
let beginEmployeeTracker = () => {
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
        viewEmployees();
      } else if (answers.start == "Add An Employee") {
        addEmployees();
      } else if (answers.start == "Remove An Employee") {
        removeEmployee();
      } else if (answers.start == "Update An Employee") {
        updateEmployee();
      } else if (answers.start == "Configure Titles") {
        configTitles();
      } else if (answers.start == "Configure Departments") {
        configDepartments();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
};
//TODO: write view employees, add / remove / update
//TODO: write config Titles, configDepartments
//TODO: proper view
