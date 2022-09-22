const inquirer = require('inquirer');
const mysql = require('mysql2');
//I created a file to store all of my inquirer questions to keep the index file clean
const initQs = require('./lib/questions');
const q = require('./lib/query');
//this package allows for easy display of data in the console
require('console.table');


//this allows me to connect to the sql database
const db = mysql.createConnection({
    host: 'localhost',
    //port being used
    port: 3306,
    user: 'root',
    password: 'rootroot',
    //name of the database
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

//this is the function to display all employees
const viewEmployees = () => {
//this is the query to the database.
    db.query(q.viewEmployees, (err, result) => {
        //first I check if there is an error
        if (err) console.error(err);
        //then I display the results if there is no error.
        console.table(result);
        init();
    })
};

//this function lets us see all the roles.
const viewRoles = () => {
//here is the query.
    db.query(q.viewRoles, (err, result) => {
        if (err) console.error(err);
        console.table(result);
        init();
    })
};

//this query was simple enough that I wrote it inline instead of in my query file.
const viewDeparts = () => {
    db.query('SELECT * FROM department', (err, result) => {
        if (err) console.error(err);
        console.table(result);
        init();
    })
}
//add a role
const addRole = () => {
    let departChoice = [];
    db.query(q.departList, (err, result) => {
        if (err) console.log(err);
        //here I am using a loop to push the existing departments to display
        for (let choice of result) departChoice.push(choice);
        //then I am able to add the role to the specific department
    })
    let departList = [];
    db.query('SELECT * FROM department', (err, result) => {
        if (err) console.error(err);
        departList = result
    });

    inquirer.prompt([{
        //here are the questions for adding a role.
            type: 'input',
            name: 'roleName',
            message: 'What is the name of the role?'
        },
        //set the salary
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of this role?'
        },
        //chose the department it belongs to.
        {
            type: 'list',
            name: 'depart',
            message: 'What department does it belong to?',
            choices: departChoice
        }
        //after we are taking that data and sending the query to add the new role.
    ]).then((data) => {
        newDepart = departList.filter(depart => depart.name == data.depart);
        db.query(q.addRole, [data.roleName, data.salary, newDepart[0].id], (err, result) => {
            if (err) console.log(err);
            console.log(`added${data.roleName} to roles`);
            init();
        })
    })
};

//adding an employee is similar to the role, just different terms

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

//add department is the simplest addition as departments are standalone
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

//update role
const updateRole = () => {
    //first we need to add all the roles to pick one to update
    let roleList = [];
    db.query('SELECT * FROM role;', (err, result) => {
        if (err) console.error(err);
        roleList = result;
    });
    //then we add the employees to update their role.
    let employeeArray = [];
    db.query(q.getNames, (err, result) => {
        if (err) console.error(err);
        //get first name and last name and join them together
        for (let person of result) {
            let fullName = `${person.first} ${person.last}`;
            employeeArray.push(fullName);
        };
        //here we ask the questions to update the role
        inquirer.prompt([{
            type: 'list',
            message: 'Which employee\'s role do you want to update?',
            name: 'employee',
            choices: employeeArray
        },
        //here we use the role list to pick which to change to
        {
            type: 'list',
            name: 'newRole',
            message: 'what is the new role?',
            choices: roleList
        }]).then((data) => {
            //find id and match with name.
            //update table where it matches employee id.
            console.log(employeeArray, '222222222');
            db.query(q.updateRole, (err, result) => {
                console.log(result);
            });
        })
    });
}
//here is the main function that runs the whole program.
const init = async () => {
    console.log('\n----------E-m-p-l-o-y-e-e----T-r-a-c-k-e-r----------\n');
    //this allows us to save the users pick from the main menu.
    let userChoice = await inquirer.prompt(initQs); //questions is the array for the main screen
//here is the switch that lets us pick which function to run.
    switch (userChoice.userPick) {
        case 'view all employees':
            viewEmployees();
            //break tells the switch to stop
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

//here is where we run the init function.
init();
