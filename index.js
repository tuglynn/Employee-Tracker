const inquirer = require('inquirer');
const mysql = require('mysql2');
const initQs = require('./lib/questions');
const q = require('./lib/query');


//this allows me to connect to the sql database
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'rootroot',
    database: 'employees_db'
});
// this makes the connection in the terminal to the db
db.connect((err) => {
    if (err) {
        console.error('Error message:', err);
        return;
    }
    console.log(`connected to database`)
})

//write code to convert role or department name into role_id or department_id
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
const addRole = () => {
    let departChoice = [];
    db.query(q.departList, (err, result) => {
        if (err) console.log(err);
        for (let choice of result) departChoice.push(choice);
    })
    let departList = [];
    db.query('SELECT * FROM department', (err, result) => {
        if (err) console.error(err);
        departList = result
    });

    inquirer.prompt([{
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'
        },
        {
            type: 'list',
            name: 'depart',
            message: 'What department does it belong to?',
            choices: departChoice
        }
    ]).then((data) => {
        newDepart = departList.filter(depart => depart.name == data.depart);
        db.query(q.addRole, [data.roleName, data.salary, newDepart[0].id], (err, result) => {
            if (err) console.log(err);
            console.log(`added${data.roleName} to roles`);
            init();
        })
    })
};

const addEmployee = () => {
    let roleChoice = [];
    db.query(q.rolesList, (err, result) => {
        if (err) console.error(err);
        for (let choice of result) {
            roleChoice.push(choice.title);
        };
    });
    let roleList = [];
    db.query('SELECT * FROM role;', (err, result) => {
        if (err) console.error(err);
        roleList = result;
    });

    inquirer.prompt([{
            type: 'input',
            name: 'first_name',
            message: 'What is the employees first name?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the employees last name?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is their position?',
            choices: roleChoice
        }
    ]).then((data) => {
        let newRole = roleList.filter(role => role.title == data.role);
        db.query(q.addEmployee, [data.first_name, data.last_name, newRole[0].id], (err, result) => {
            if (err) console.error(err);
            console.log(`added ${data.first_name} ${data.last_name} to employees`);
            init();
        })
    })
}

const addDepart = () => {
    inquirer.prompt([{
        type: 'input',
        name: 'department',
        message: 'What is the name of the department?'
    }]).then((data) => {
        db.query(q.addDepart, data.department, (err, result) => {
            if (err) console.error(err);
            console.log(`added ${data.department} to departments`);
            init();
        })
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
            process.exit();
    }
};


init();


//inquirer-table-prompt