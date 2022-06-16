const queries = {
    viewEmployees: `SELECT
    employee.first_name,
    employee.last_name,
    role.title as role,
    role.salary as salary,
    department.name as department
    FROM employee, role, department
    WHERE employee.role_id = role.id
    AND role.department_id = department.id;
    `,
    viewRoles: `SELECT 
    role.title as Role,
    role.salary as Salary,
    department.name as Department
    FROM employees_db.role
    JOIN department ON role.department_id = department.id;
    `,
    addDepart: `
    INSERT INTO department (name)
    VALUES (?)`,
    addRole: `
    INSERT INTO role (title, salary, department_id)
    VALUES (?, ?, ?);`,
    addEmployee: `
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, 1);`,
    rolesList: `
    SELECT role.title
    FROM role`,
    departList: `
    SELECT department.name
    FROM department;`,
    getNames: `
    SELECT first_name as first, last_name as last
    FROM employees_db.employee;`,
    updateRole: `
    UPDATE employee
    SET role_id = ?
    WHERE id = ?;`

}

module.exports = queries;