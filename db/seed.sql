USE employeeDB;

INSERT INTO department (name)
Values ("Sales"), ("Marketing"), ("Engineering"), ("Human Resources");

INSERT INTO role (title, salary, department_id)
VALUES 
("Lead Engineer", 200000, 3),
("Sales Manager", 140000, 1),
("HR Manager", 125000, 4),
("Marketing Manager", 130000, 2),
("Sales Rep", 95000, 1),
("Marketing Associate", 80000, 2),
("Senior Engineer", 150000, 2),
("Junior Engineer", 90000, 2);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Alex", "Chisar", 1, NULL),
("Jane", "Smith", 2, NULL),
("George", "Washington", 3, NULL),
("Allen", "Iverson", 4, Null),
("Dwayne", "Johnson", 5, 2),
("Nicolas", "Cage", 6, 3),
("Keanu", "Reeves", 7, 1),
("Tom", "Hanks", 8, 1)