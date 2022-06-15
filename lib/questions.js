const welcomePage = ['view all employees', 'view all roles', 'view all departments', 'add an employee', 'update employee role', 'add a role', 'add a department', 'quit']

const initQs = [{
    type: 'list',
    message: 'What do you want to do today?',
    name: 'userPick',
    choices: welcomePage
}]

// const employeeQ = [{
//         type: 'input',
//         name: 'first_name',
//         message: 'What is the employees first name?'
//     },
//     {
//         type: 'input',
//         name: 'last_name',
//         message: 'What is the employees last name?'
//     },
//     {
//         type: 'list',
//         name: 'role',
//         message: 'What is their position?',
//         choices: ['nope', 'yup', 2]
//     },
//     {
//         type: 'list',
//         name: 'manager',
//         message: 'Who is this employee\'s manager',
//         choices: ['stevie', 'beckie']
//     }

// // ]

// const newDepart = [{
//     type: 'input',
//     name: 'department',
//     message: 'What is the name of the department?'
// }]

// const newRole = [{
//         type: 'input',
//         name: 'roleName',
//         message: 'What is the name of the role?'
//     },
//     {
//         type: 'input',
//         name: 'salary',
//         message: 'What is the salary of this role?'
//     },
//     {
//         type: 'list',
//         name: 'depart',
//         message: 'What department does it belong to?',
//         choices: ['HAY', 'HOW', 'HI']
//     }
// ]


module.exports = initQs