DROP DATABASE if exists employees_db;

Create DATABASE employees_db;

use employees_db;

Create Table  employees(
id INT NOT NULL AUTO_INCREMENT,
first_name VARCHAR(50) NOT NULL,
last_name VARCHAR(50) NOT NULL,
title VARCHAR(50) NOT NULL,
department VARCHAR(50) NOT NULL,
salary INT(50) NOT NULL,
manager VARCHAR(50) NOT NULL,
PRIMARY KEY(id))
;
INSERT INTO employees (first_name, last_name, title, department, salary, manager)
VALUES ("Maria", "K", "Engineer", "Engineering", 60000, "Dave Cat"),
("Gus", "H", "Engineer", "Engineering", 55000, "Dave Cat"),
("Shannon", "T", "Sales Person", "Sales", 80000, "Kelly Kapoor"),
("Ramdeep", "K", "Personnel", "Human Resources", 50000, "Andrea Gourmand"),
("Sarah", "M", "Market Researcher", "Marketing", 70000, "Xernona Petri"),
("Nicholas", "L", "Market Researcher", "Marketing", 65000, "Xernona Petri"),
("Siqi", "Y", "Engineer", "Engineering", 75000, "Dave Cat"),
("Kalim", "B", "Engineer", "Engineering", 95000, "Dave Cat"),
("Marina", "R", "Engineer", "Engineering", 85000, "Dave Cat"),
("Luke", "C", "Security Guard", "Security", 50000, "Cintra Goss"),
("Dave", "Cat", "Manager", "Management", 95000, "N/A"),
("Kelly", "Kapoor", "Manager", "Management", 100000, "N/A"),
("Andrea", "Gourmand", "Manager", "Management", 120000, "N/A"),
("Xernona", "Petri", "Manager", "Management", 115000, "N/A"),
("Cintra", "Goss", "Manager", "Management", 150000, "N/A")

