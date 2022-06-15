const inquirer = require('inquirer');
const mysql = require('mysql2');
const initQs = require('./lib/questions');
const q = require('./lib/query');



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
    //id, first, last, title(role), department, salary, manager
    db.query(q.viewEmployees, (err, result) => {
        if (err) console.error(err);
        console.table(result);
        init();
    })
};

const viewRoles = () => {
    //id of role, title of role, the department of the role, and the salary.
    db.query(q.viewRoles, (err, result) => {
        if (err) console.error(err);
        console.table(result);
        init();
    })
};

const viewDeparts = () => {
    //id and name
    db.query('SELECT * FROM department', (err, result) => {
        if (err) console.error(err);
        console.table(result);
        init();
    })
}

const init = async () => {
    console.log('\n----------E-m-p-l-o-y-e-e----T-r-a-c-k-e-r----------\n');
    //this allows us to save the users pick from the main menu.
    let userChoice = await inquirer.prompt(initQs); //questions is the array for the main screen

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
};


init();


//inquirer-table-prompt