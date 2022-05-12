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
                name: "view all roles",
                value: "view_all_roles"
              }, 
              {
                name: "view all departments",
                value: "view_all_departments"
              }, 
              {
                name: "add a department",
                value: "add_a_department"
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
          case 'add_a_department':
              console.log('testing');
          AddDepartment();
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

        