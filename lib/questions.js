//front page what to do
//1 view all employees, 2 add employee, 3 update employee role, 
//4 view all roles, 5 add role, 6 view all departments, 7 add department
//8 quit
const welcomePage = ['view all employees', 'add an employee', 'update employee role', 'view all roles', 'add a role', 'view all departments', 'add a department', 'quit']

const initQs = [{
    type: 'list',
    message: 'What do you want to do today?',
    name: 'userPick',
    choices: welcomePage
}]

module.exports = initQs