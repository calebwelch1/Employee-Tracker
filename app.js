const inquirer = require("inquirer");
const mysql = require("mysql");
const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 8080;
const cTable = require("console.table");
// call once somewhere in the beginning of the app
//takes an object use this later to print out employees
// console.table([
//   {
//     name: "foo",
//     age: 10,
//   },
//   {
//     name: "bar",
//     age: 20,
//   },
// ]);
// prints
// name  age
// ----  ---
// foo   10
// bar   20
// app.listen(PORT, (x) => {
//   console.log(`Listening on Port${PORT}`);
// });
// mysql connection
const mySqlConnect = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});
// this just creates the connection to the server so that it is open while the program is running
// TODO: add function to add departments/titles/managers to list
let departmentsArr = [
  "Engineering ",
  "Sales ",
  "Human Resources ",
  "Marketing ",
  "Security ",
  "Support ",
  "Management ",
];
let titlesArr = [
  "Engineer ",
  "Sales Person ",
  "Market Researcher ",
  "Security Guard ",
  "Personnel ",
  "Manager ",
];
let managersArr = [
  "Dave Cat ",
  "Kelly Kapoor ",
  "Andrea Gourmand ",
  "Xernona Petri ",
  "Cintra Goss ",
];
mySqlConnect.connect((err) => {
  if (err) {
    throw err;
  }
  console.table([
    {
      Employee: "",
      Tracker: "",
    },
  ]);
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
          "Configure Managers (Does not alter table data)",
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
      } else if (answers.start == "Configure Managers") {
        configManagers();
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

let viewEmployees = () => {
  beginEmployeeTracker();
  let query = "SELECT * FROM employees_db.employees";
  mySqlConnect.query(query, (err, res) => {
    if (err) {
      throw err;
    }
    // something like magic getting this table to work. yet so simple
    console.table(
      [
        "id",
        "first_name",
        "last_name",
        "title",
        "department",
        "salary",
        "manager",
      ],
      res
    );
    // console.log(res);
  });
};

let addEmployees = () => {
  inquirer
    .prompt([
      {
        name: "addEmployee",
        type: "input",
        message:
          "Enter employee first name, last name, title, department, salary and manager seperated by commas",
        // validate: (value)=>{
        //     if
      },
    ])
    .then((answer) => {
      console.log(answer);
    });
  // let query = "INSERT ?"
};

let configDepartments = () => {
  inquirer
    .prompt([
      {
        name: "addDepartment",
        type: "input",
        message:
          "Enter the name of a new Department. (Type menu to return to main menu. Type clear to clear departments)",
      },
    ])
    .then((answer) => {
      if (answer.addDepartment == "menu") {
        beginEmployeeTracker();
      } else if (answer.addDepartment == "clear") {
        departmentsArr = [];
        console.log("Departments Cleared");
        configDepartments();
      } else {
        departmentsArr.push(answer.addDepartment);
        console.log(`Departments: ${departmentsArr}`);
        configDepartments();
      }
    });
  //   beginEmployeeTracker();
};

let configTitles = () => {
  inquirer
    .prompt([
      {
        name: "addTitle",
        type: "input",
        message:
          "Enter the name of a new Title. (Type menu to return to main menu. Type clear to clear departments)",
      },
    ])
    .then((answer) => {
      if (answer.addTitle == "menu") {
        beginEmployeeTracker();
      } else if (answer.addTitle == "clear") {
        titlesArr = [];
        console.log("Titles Cleared");
        configTitles();
      } else {
        titlesArr.push(answer.addTitle);
        console.log(`Titles: ${titlesArr}`);
        configTitles();
      }
    });
};
