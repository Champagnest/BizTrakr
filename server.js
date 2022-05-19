const inquirer = require("inquirer");
const db = require("./db/connection")
start()
function start() {
inquirer
  .prompt([
    {
        type:"list",
        message: "please choose from these options",
        name: "choice",
        choices: [
            {
                name: "View All Employees",
                value: "view_employees"
              },
              {
                name: "view all departments",
                value: "view_all_departments"
              }, 
              {
                name: "view all roles",
                value: "view_all_roles"
              }, 
              {
                name: "add a role",
                value: "add_a_role"
              }, 
              {
                name: "add a department",
                value: "add_a_department"
              }, 
              {
                name: "add an employee",
                value: "add_an_employee"
              }, 
              {
                name: "update an employee role",
                value: "update_an_employee_role"
              },
            ,

        ]
    }
  ])
  .then((answers) => {
      console.log(answers)
      switch (answers.choice) {
        case "view_employees":
         ViewEmployees();
          break;
        case 'view_all_roles':
            ViewRoles();
            break;
        case 'view_all_departments':
            ViewDepartments();
            break;
          // expected output: "Mangoes and papayas are $2.79 a pound."
          break;
          case 'add_a_role':
              console.log('testing');
          AddRole();
          break;
          case 'add_a_department':
              console.log('testing');
          AddDepartment();
          break;
          case 'add_an_employee':
              console.log('testing');
          AddEmployee();
          break;
          case 'update_an_employee_role':
              console.log('testing');
          UpdateEmployeeRole();
          break;
        default:
      }
      
    // Use user feedback for... whatever!!
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
};
function ViewEmployees() {
db.promise().query("select * from employees;")
.then( ([rows,fields]) => {
    console.table(rows);
  })
  .then( () => {
   return start()
  })
  .catch((error) => {
   console.log(error)
  });
};
function ViewRoles() {
    db.promise().query("select * from roles;")
    .then( ([rows,fields]) => {
        console.table(rows);
      })
      .then( () => {
       return start()
      })
      .catch((error) => {
       console.log(error)
      });
    };
function ViewDepartments() {
    db.promise().query("select * from department;")
    .then( ([rows,fields]) => {
        console.table(rows);
        })
        .then( () => {
        return start()
        })
        .catch((error) => {
        console.log(error)
        });
    };

function AddDepartment() {
    
    inquirer
  .prompt([
    {message: "What is the department name?",
    name: "department",
    type: "input",
}
    /* Pass your questions in here */
  ])
  .then((answer) => {
      console.log(answer);
    db.promise().query(`INSERT INTO department (department_name) VALUES ('${answer.department}');`)
    // Use user feedback for... whatever!!
  })
  .then(() => {
    return ViewDepartments()
  })
  .catch((error) => {
   console.log(error)
  });
};

function AddRole() {
  console.log("rows")
  db.promise().query("select * from department;")
    .then( ([rows,fields]) => {
    
        return rows
      }) 
      .then((departments)=> {
        console.log(departments)
        return inquirer
        .prompt([
          {message: "What is the title of the role?",
          name: "title",
          type: "input",
        },
        {message: "What is the salary for the role?",
          name: "salary",
          type: "input",
        },
        { type:"list",
        message: "please choose a department from these options",
        name: "choices",
        choices: departments.map(dep =>{
          return {
            name: dep.department_name, 
            value: dep.id,
          }
        })
         }
          /* Pass your questions in here */
        ])
      })
.then((answer) => {
    console.log(answer);
  db.promise().query(`INSERT INTO roles (title, salary, department_id) VALUES ('${answer.title}','${answer.salary}','${answer.choices}');`)
  // Use user feedback for... whatever!!
})
.then(() => {
  return ViewRoles()
})
.catch((error) => {
 console.log(error)
});
};
        
function AddEmployee() {
  Promise.all([
    db.promise().query("select * from roles;"),
    db.promise().query("select * from employees;")
  ]) 
      .then( (values) => {
        console.log(values[0][0])
        console.log(values[1][0])
        return [values[0][0], values[1][0]]
      }) 
      .then(([roles, employees])=> {
        // console.log(arr)
        // const roles = arr[0]
        // const employees = arr[1]
        return inquirer
        .prompt([
          {message: "What is the employees first name?",
          name: "firstName",
          type: "input",
        },
        {message: "What is the employees last name?",
          name: "lastName",
          type: "input",
        },
        { type:"list",
        message: "please choose a role from these options",
        name: "role",
        choices: roles.map(role =>{
          return {
            name: role.title, 
            value: role.id,
          }
        })
        
         },
         { type:"list",
        message: "please choose a manager from these options",
        name: "manager",
        choices: !employees.length ? [{ name: 'no manager', value: null }] : employees.map(employee =>{
          return {
            name: `${employee.first_name} ${employee.last_name}`, 
            value: employee.id,
          }
        })
        
         }
          /* Pass your questions in here */
        ])
      })
.then((answer) => {
    console.log(answer);
  db.promise().query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstName}','${answer.lastName}','${answer.role}',${answer.manager});`)
  // Use user feedback for... whatever!!
})
.then(() => {
  return ViewEmployees()
})
.catch((error) => {
 console.log(error)
});
};
        
function UpdateEmployeeRole() {
  Promise.all([
    db.promise().query("select * from roles;"),
    db.promise().query("select * from employees;")
  ]) 
      .then( (values) => {
        return [values[0][0], values[1][0]]
      }) 
      .then(([roles, employees])=> {
        return inquirer
        .prompt([
        { type:"list",
        message: "please choose the employee whose role you would like to update",
        name: "employee",
        choices: employees.map(employee =>{
          return {
            name: `${employee.first_name} ${employee.last_name}`,
            value: employee.id,
          }
        })
         },
         { type:"list",
        message: "please choose the role you would like to update for the employee",
        name: "role",
        choices: roles.map(role =>{
          return {
            name: role.title,
            value: role.id,
          }
        })
         }
        ])
      })
.then((answer) => {
    console.log(answer);
  db.promise().query(`UPDATE employees SET role_id = ${answer.role} WHERE id = ${answer.employee};`)
  // Use user feedback for... whatever!!
})
.then(() => {
  return ViewEmployees()
})
.catch((error) => {
 console.log(error)
});
};
        