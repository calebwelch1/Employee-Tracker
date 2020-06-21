const inquirer = require("inquirer");
const mysql = require("mysql");
const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 8080;
const cTable = require("console.table");

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
  console.table([
    {
      Employee: "",
      Tracker: "",
    },
  ]);
  beginEmployeeTracker();
});
let employeeSort = () => {
  // manager sort
  let managerSort = () => {
    let query =
      "SELECT id, first_name, last_name, title, department, salary, manager FROM employees ORDER BY Manager DESC";
    mySqlConnect.query(query, (err, res) => {
      if (err) {
        throw err;
      }
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
    });
    beginEmployeeTracker();
  };
  // salarySort
  let salarySort = () => {
    let query =
      "SELECT id, first_name, last_name, title, department, salary, manager FROM employees ORDER BY Salary DESC";
    mySqlConnect.query(query, (err, res) => {
      if (err) {
        throw err;
      }
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
    });
    beginEmployeeTracker();
  };
  // DepartmentSort()
  let departmentSort = () => {
    let query =
      "SELECT id, first_name, last_name, title, department, salary, manager FROM employees ORDER BY Department DESC";
    mySqlConnect.query(query, (err, res) => {
      if (err) {
        throw err;
      }
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
    });
    beginEmployeeTracker();
  };
  inquirer
    .prompt([
      {
        name: "sort",
        type: "list",
        message: "How would you like to sort employees?",
        choices: ["By Manager", "By Salary", "By Department"],
      },
    ])
    .then((answer) => {
      if (answer.sort == "By Manager") {
        managerSort();
      } else if (answer.sort == "By Salary") {
        salarySort();
      } else if (answer.sort == "By Department") {
        departmentSort();
      }
    });
};

exports.employeeSort = employeeSort();
