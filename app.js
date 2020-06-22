const inquirer = require("inquirer");
const mysql = require("mysql");
const path = require("path");
const express = require("express");
const app = express();
require("dotenv").config();
const PORT = 8080;
const cTable = require("console.table");
// const employeeSort = require("./Sort"); can't get exports to work properly
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
          "View Employees Sort",
          "Add An Employee",
          "Remove An Employee",
          "Update An Employee",
          new inquirer.Separator(),
          "Configure Titles",
          "Configure Departments",
          "Configure Managers (Does not alter table data)",
          new inquirer.Separator(),
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
      } else if (
        answers.start == "Configure Managers (Does not alter table data)"
      ) {
        configManagers();
      } else if (answers.start == "View Employees Sort") {
        employeeSort();
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
//TODO: Split Into Multiple Tables

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
// add
let addEmployees = () => {
  inquirer
    .prompt([
      {
        name: "addEFname",
        type: "input",
        message: "Enter employee first name",
      },
      {
        name: "addELname",
        type: "input",
        message: "Enter employee last name",
      },
      {
        name: "addETitle",
        type: "list",
        message: "Choose a title",
        choices: titlesArr,
      },
      {
        name: "addEDepartment",
        type: "list",
        message: "Choose a department",
        choices: departmentsArr,
      },
      {
        name: "addESalary",
        type: "input",
        message: "Input employee Salary",
      },
      {
        name: "addEManager",
        type: "list",
        message: "Choose a manager for the employee",
        choices: managersArr,
      },
    ])
    .then((answer) => {
      let salary = parseInt(answer.addESalary);
      // didn't work until I added quotes around the answers!!!
      let query = `INSERT INTO employees (first_name, last_name, title, department, salary, manager) VALUES ("${answer.addEFname}", "${answer.addELname}", "${answer.addETitle}", "${answer.addDepartment}", ${salary}, "${answer.addEManager}")`;
      // let query =
      //   "INSERT INTO employees (first_name, last_name, title, department, salary, manager) VALUES(Bob, Saget, Comedian, Funny, 100000, Dave Cat)";
      mySqlConnect.query(
        query,
        // can't get ? to work... maybe i need many ?'s
        // [
        //   answer.addEFname,
        //   answer.addELname,
        //   answer.addETitle,
        //   answer.addEDepartment,
        //   answer.addESalary,
        //   answer.addEManager,
        // ],
        (err) => {
          if (err) {
            throw err;
          }
        }
      );
      //   console.log(answer);
      beginEmployeeTracker();
    });
  // let query = "INSERT ?"
};
// remove employee
let removeEmployee = () => {
  inquirer
    .prompt({
      name: "remove",
      type: "input",
      message: "Enter ID of employee you would like to remove",
    })
    .then((answer) => {
      let ID = parseInt(answer.remove);
      let query = `DELETE FROM employees WHERE ID =${ID}`;
      mySqlConnect.query(query, (err) => {
        if (err) {
          throw err;
        }
      });
      beginEmployeeTracker();
    });
};
//update employee
// can't get when prompt to work properly will fix later
let updateEmployee = () => {
  inquirer
    .prompt(
      {
        name: "UEID",
        type: "input",
        message: "Input ID of employee you would like to update",
      },
      {
        name: "UEType",
        type: "list",
        message: "Choose Data type to update",
        choices: ["Title", "Salary", "Department", "Manager"],
      },
      {
        name: "UETitle",
        type: "list",
        message: "Choose a new title for the employee",
        choices: titlesArr,
        when: (answers) => {
          answers.UEType == "Title";
        },
      }
    )
    .then((answer) => {
      console.log(answer);
    });
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
          "Enter the name of a new Title. (Type menu to return to main menu. Type clear to clear Titles)",
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

let configManagers = () => {
  inquirer
    .prompt([
      {
        name: "addManager",
        type: "input",
        message:
          "Enter the name of a new Manager. (Type menu to return to main menu. Type clear to clear Managers)",
      },
    ])
    .then((answer) => {
      if (answer.addManager == "menu") {
        beginEmployeeTracker();
      } else if (answer.addManager == "clear") {
        managersArr = [];
        console.log("Managers Cleared");
        configManagers();
      } else {
        managersArr.push(answer.addManager);
        console.log(`Titles: ${managersArr}`);
        configManagers();
      }
    });
};
// sort employees by different groups
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
