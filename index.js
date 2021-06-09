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

fixRoleID = getRole();

const start = () => {
    console.log("\n")
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
                    "Add employee",
                    "Update employee role",
                    "View all roles",
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
                case "Add employee":
                    return addEmployee();
                case "Update employee role":
                    return updateEmployeeRole();
                case "View all roles":
                    return viewAllRoles();
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
    inquirer.prompt([
        {
            name: "departments",
            type: "list",
            message: "Select a department",
            choices: getDepartments()
        }
    ])
    
    
    let query = "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?"
    connection.query(query, (err, res) => {
        console.table(res)
        start();
    });

};

console.log(getDepartments());

function addEmployee() {
    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is your first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is your last name?"
        },
        {
            name: "role",
            type: "list",
            message: "Pick a role",
            choices: getRole()
        }
    ])
        .then((data) => {
            let roleID = fixRoleID.indexOf(data.role) + 1;
            let query = "INSERT INTO employee SET ?"
            connection.query(query, {
                first_name: data.first_name,
                last_name: data.last_name,
                role_id: roleID
            }, (err, res) => {
                console.log("Employee added.")
                start();
            });
        })
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


function viewAllDepartments() {
    let query = "SELECT * FROM department ORDER BY id";
    connection.query(query, (err, res) => {
        console.table(res);
        start();
    });
};

function getDepartments() {
    let pickDept = [];
    let query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        for (let i = 0; i < res.length; i++) {
            pickDept.push(res[i].name);
        }
    });
    return pickDept;
};

function getRole() {
    let pickRole = [];
    let query = "SELECT * FROM role"
    connection.query(query, (err, res) => {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
            pickRole.push(res[i].title);
        }

    })
    return pickRole;
};



function getManager() {
    let managers = [];
    let query = "SELECT first_name, last_name FROM employee";
    connection.query(query, (err, res) => {
        if (err) throw err
        for (let i = 0; i < res.length; i++) {
            managers.push((res[i].first_name) + " " + (res[i].last_name));
        }
    })
    return managers;
}



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
            connection.query(query, { name: data.department }, (err, res) => {
                console.log("Department added.")
                start();
            })
        })

};


function exit() {
    connection.end();
};
