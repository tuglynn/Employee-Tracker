const queries = {
    viewEmployees: `SELECT
    employee.first_name as first_name,
    employee.last_name as last_name,
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
    `
}

module.exports = queries;