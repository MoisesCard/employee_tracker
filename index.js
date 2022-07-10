
const mysql = require("mysql2");
const table = require("console.table");
const inquirer = require ("inquirer")
equire("dotenv").config()

const db = mysql.createConnection({
    host: 'localhost',
    port: '3001',
    user: process.env.DB_USER,
    password: process.env.DB_PW,
    database: process.env.DB_NAME,
});

// links db to prompt user 
db.connect(()=> {
    promptUser()
})

const promptUser = () => {
    return inquirer
    .prompt([
        {
            type: "list",
            name: "what",
            message: "What would you like to do? (select one)",
            choices: [
                "View all departments",
                "View all roles",
                "View all employees",
                "View all employees by manager",
                "Add a department",
                "Add an employee",
                "Add Role",
                "Update an empoyee role",
                "Quit",
            ],
        },
    // create prompts for choices
    ]) .then ((response) => {
        switch(response.what) {
            case "View all departments":
                // called below
                viewAllDepartments()
                break;
            case "View all roles":
                viewAllRoles()
                break;
            case "View all employees":
                vieAllEmployees()
                break;
            case "Add a department":
                addDepartment()
                break;
            case "Add role":
                addRole()
                break;
            case "Add an employee":
                addEmployee()
                break;
            // case "Update an employee role":
            //     updateRole()
            //     break;
            case "Quit":
                db.end()
        }
    })
}
// functions for when you view all departments
const viewAllDepartments = () => {
    db.query("SELECT * FROM department", (err, res) => {
        if (err) 
            throw err;
        console.table(res)
        promptUser();
    })
}
//views all roles from role table
const viewAllRoles = () => {
    db.query("SELECT * FROM department")
    db.query("SELECT title FROM role_table", (err, res) => {
        if (err)
            throw err;
        console.table(res)
        promptUser();
    })
}
//viewds all employees
const viewAllEmployees = () => {
    db.query("SELECT first_name, last_name FROM employees", (err, res) => {
        if (err)
        throw err;
    console.table(res)
    promptUser();
    })
}

const addDepartment = () => {
    inquirer.prompt(
        {
            type: "input",
            name: "department",
            message: "Insert new department",
        })
    .then(res => {
        db.query("INSERT INTO department SET ?",
        {
            dep_name: res.department
        },
        (err, res) => {
            if (err)
            throw err;
        console.log (`Department added! Select "view all departments" to see addition.`);
        promptUser();
        })
    })
}

const addRole = () => {
    db.query("SELECT * FROM department", (err, res) => {
        if (err)
            throw err;

        inquirer.prompt([
            {
            type: "input",
            name: "role",
            message: "Insert the name of the new role (Required)",
            },
            {
            type: "input",
            name: "salary",
            message: "What is this role's salary (Required)",
            },
            {
            type: "list",
            name: "depID",
            message: "Please select the Department ID (Required)",
            choices:
            // takes all of the values from department and returns 
                res.map(department => department.dep_name)
            }
        ]) .then(data => {
            // returns name of the department depID.id (comes from integer created from table creation)
            const depID = res.find(department => department.dep_name === data.depID)
            db.query("INSERT INTO role_table SET ?", {
                title: data.role, salary: data.salary, department_id: depID.id
            }, 
            err => {
                if (err) 
                    throw err;

            console.log("Role successfully added. Select 'view all roles' to see addition")
            promptUser(); 
        }
            ) 
        })
    })
}

const addEmployee = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "Insert the new employee's first name (required)"
        },
        {
            type: "input",
            name: "lastName",
            message: "Insert the new employee's last name (required)"
        },
        {
            type: "input",
            name: "roleID",
            message: "Insert the new employee's role ID (required)"
        },
        {
            type: "input",
            name: "managerID",
            message: "Insert ID of employee's new manager (required)"
        }
    ])
    .then(res => {
        db.query("INSERT INTO employees SET ?",
        {
            first_name: res.firstName,
            last_name: res.lastName,
            role_id: res.roleID,
            manager_id: res.managerID,
        },
        (err, res) => {
            if (err)
            throw err;
            console.log(`New Employee added! Select "view all employees" to see addition.`);
            promptUser();
        })
    })
}
    
const updateRole = () => {
    // add function to UPDATE 
        // set
            // column name
        // WHERE
            // condition 
    }


