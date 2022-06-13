const inquirer = require('inquirer');
const mysql = require('mysql2');
const questions = require('./lib/questions');





const db = mysql.createConnection({
        host: 'localhost',
        port: 3001,
        user: 'root',
        password: 'rootroot',
        database: 'employees_db'
    },
    console.log('Connected to the employees_db database.')
);


inquirer.prompt([questions]).then((answers) => {
    console.log(answers)
}).catch(err);

// const splashPage = inquirer.prompt([questions]).then((answers) => {
//     console.log(answers)
// }).catch(err);

// splashPage();
//inquirer-table-prompt