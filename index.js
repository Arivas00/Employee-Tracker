const mysql = require('mysql');
const inquirer = require('inquirer');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
  
    password: '',
    database: 'employeeDB',
  });

  connection.connect()
  
//   connection.connect((err) => {
//     if (err) throw err;
    
//   });