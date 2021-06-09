const mysql = require('mysql');
const inquirer = require('inquirer');
require('dotenv').config();
require('console.table');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
});


connection.connect((err) => {
    if (err) throw err;
    start();
});

const start = () => {
    console.log("********Employee Tracker********")
    inquirer
        .prompt([
            {
                type: "list",
                name: "choices",
                message: "What would you like to do?",
                choices: [
                    "View all employees",
                    "View all employees by department",
                    "View all employees by manager",
                    "Add employee",
                    "Update employee role",
                    "View all roles",
                    "Add Role",
                    "View all departments",
                    "Add department",
                    "Exit"
                ]
            }
        ])
        .then((answer) => {
            switch (answer.choices) {
                case "View all employees":
                    return employees();
                case "View all employees by department":
                    return employeesByDepartment();
                case "View all employees by manager":
                    return employeesByManager();
                case "Add employee":
                    return addEmployee();
                case "Update employee role":
                    return updateEmployeeRole();
                case "View all roles":
                    return viewAllRoles();
                case "Add role":
                    return addRole();
                case "View all departments":
                    return viewAllDepartments();
                case "Add department":
                    return addDepartment();
                case "Exit":
                    return exit();    
            }
        })
}

function employees() {
    let query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    connection.query(query, (err, res) => {
        console.table(res);
        start();
    });
};

function employeesByDepartment() {
    let 

};

function employeesByManager() {

};

function addEmployee() {

};

function updateEmployeeRole() {

};

function viewAllRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, (err, res) => {
        console.table(res);
        start();
    });
};

function addRole() {

};

function viewAllDepartments() {
    let query = "SELECT * FROM department ORDER BY id";
    connection.query(query, (err, res) => {
        console.table(res);
        start();
    });
};

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department?"
        }
    ])
    .then((data) => {
        let query = "INSERT INTO department SET ?"
        connection.query(query, { name: data.department}, (err, res) => {
            console.log("Department added.")
            start();
        })
    })

};

function exit() {
    connection.end();
};
