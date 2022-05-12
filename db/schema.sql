drop database if exists employees;
create database employees;
use employees;

CREATE TABLE department (
    id int primary key AUTO_INCREMENT,
    department_name varchar(30)
    
);
CREATE TABLE roles (
    id int primary key AUTO_INCREMENT,
    title varchar(30),
    salary decimal,
    department_id int,
    CONSTRAINT FK_department
    FOREIGN KEY (department_id)
    REFERENCES department(id) on delete cascade
    
);
CREATE TABLE employees (
    id int primary key AUTO_INCREMENT,
    first_name varchar(30),
    last_name varchar(30),
    role_id INT,
    manager_id int,
    CONSTRAINT FK_role
    FOREIGN KEY (role_id)
    REFERENCES roles(id) on delete cascade,
    CONSTRAINT FK_manager
    FOREIGN KEY (manager_id)
    REFERENCES employees(id)
    
);