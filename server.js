const inquirer = require('inquirer');
const mysql = require('mysql2');
const questions = require('./lib/questions');



const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootroot',
    database: 'employees_db'
});

db.connect((err) => {
    if (err) {
        console.error('error connecting*********', err);
        return;
    }
    console.log(`connected to database`)
})

const init = async () => {
    let userChoice = await inquirer.prompt(questions);
}
switch (userChoice) {
    case 'view all employees':
        viewEmployees();
        break;
    case 'add an employee':
        addEmployee();
        break;
    case 'update employee role':
        updateRole();
        break;
    case 'view all roles':
        viewRoles();
        break;
    case 'add a role':
        addRole();
        break;
    case 'view all departments':
        viewDeparts();
        break;
    case 'add a department':
        addDepart();
        break;
    case 'quit':
        break;
};


init();


//inquirer-table-prompt