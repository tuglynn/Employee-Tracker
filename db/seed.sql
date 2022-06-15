INSERT INTO department (name)
VALUES ("Cameras"),
    ("Home Goods"),
    ("Electronics"),
    ("Music");

INSERT INTO role (title, salary, department_id)
VALUES ("Sales person", 50000, 2),
        ("Camera expert", 67000, 1),
        ("Computer guys", 100000, 3),
        ("Music Teacher", 30000, 4);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Hal", "Harmon", 1, null),
        ("Cecee", "Squi", 2, 1),
        ("Jim", "Beam", 3, 1),
        ("George", "Star", 4, 1);