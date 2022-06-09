const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        database: 'employees_db'
    },
    console.log('Connected to the employees_db database.')
);





app.listen(PORT, () => console.log(`running server on port ${PORT}`));