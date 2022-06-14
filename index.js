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
        console.error('Error message:', err);
        return;
    }
    console.log(`connected to database`)
})

const viewEmployees = () => {
    db.query('SELECT * FROM employee', (err, result) => {
        if (err) console.error(err);
        let employees = [];
        result.forEach(employee => employees.push(employee));
        console.table(employees);
        init();
    })
};

const init = async () => {
    //this allows us to save the users pick from the main menu.
    let userChoice = await inquirer.prompt(questions); //questions is the array for the main screen

    switch (userChoice.userPick) {
        case 'view all employees':
            console.log('employeeeees');
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
    }
    //userChoice.userPick is the value that we will use 
    console.log(userChoice.userPick);
};


init();


//inquirer-table-prompt