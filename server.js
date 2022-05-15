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
                name: "view all Roles",
                value: "view_all_Roles"
              }, 
              {
                name: "add a Role",
                value: "add_a_Role"
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
        case 'view_all_Roles':
            ViewRoles();
            break;
          // expected output: "Mangoes and papayas are $2.79 a pound."
          break;
          case 'add_a_Role':
              console.log('testing');
          AddRole();
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
    
  inquirer
.prompt([
  {message: "What is the Role name?",
  name: "role",
  type: "input",
}
  /* Pass your questions in here */
])
.then((answer) => {
    console.log(answer);
  db.promise().query(`INSERT INTO role (role_name) VALUES ('${answer.Role}');`)
  // Use user feedback for... whatever!!
})
.then(() => {
  return ViewRoles()
})
.catch((error) => {
 console.log(error)
});
};
        
function AddEmployees() {
    
  inquirer
.prompt([
  {message: "What is the employee's name?",
  name: "employee",
  type: "input",
}
  /* Pass your questions in here */
])
.then((answer) => {
    console.log(answer);
  db.promise().query(`INSERT INTO employee (employee_name) VALUES ('${answer.employees}');`)
  // Use user feedback for... whatever!!
})
.then(() => {
  return ViewRoles()
})
.catch((error) => {
 console.log(error)
});
};
        
function updateEmployeeRole() {
    
  inquirer
.prompt([
  {message: "What is the employee's name?",
  name: "employeeRole",
  type: "input",
}
  /* Pass your questions in here */
])
.then((answer) => {
    console.log(answer);
  db.promise().query(`INSERT INTO employeeRole (employee_role) VALUES ('${answer.employeeRole}');`)
  // Use user feedback for... whatever!!
})
.then(() => {
  return ViewEmployeeRoles()
})
.catch((error) => {
 console.log(error)
});
};
        