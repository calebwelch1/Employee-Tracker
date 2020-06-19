const inquirer = require("inquirer");
const mysql = require("mysql");
const path = require("path");
const express = require("express");
const app = express();
const dotenv = require("dotenv");
const PORT = 8080;

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

inquirer.prompt({});
