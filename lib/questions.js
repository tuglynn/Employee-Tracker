const welcomePage = ['view all employees', 'add an employee', 'update employee role', 'view all roles', 'add a role', 'view all departments', 'add a department', 'quit']

const initQs = [{
    type: 'list',
    message: 'What do you want to do today?',
    name: 'userPick',
    choices: welcomePage
}]



module.exports = initQs