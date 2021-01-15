const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const util = require("util");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = [];

// const writeFileAsync = util.promisify(fs.writeFile);

 const whatToDo = () => {
  inquirer.prompt([
    {
        type: "list",
        message: "What do you want to do?",
        name: "action",
        choices: ["Add Engineer", "Add Intern", "Add Manager", "Update Team", "Quit"]
    }

  ]).then(({ action }) => {
        switch (action) {
            case "Add Engineer":
                createEngineer();
                break;

            case "Add Intern":
                createIntern();
                break;

            case "Add Manager":
                createManager();
                break;

            case "Update Team":
                generateHTML();
                break;

            case "Quit":
                console.log("Thanks, you're all set.")
                break;
            
            default:
                break;
        }
    })
};

const createEngineer = () => {
//function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Employee name:",
            validate: input => {
                return input === '' ? "Please enter a name." : true;
            }
        },
        {
            type: "number",
            name: "id",
            message: "Enter Employee ID number:",
            validate: input => {
                return input === '' ? "Please enter an ID." : true;
            },
            filter: input => {
                return Number.isNaN(input) || Number(input) <= 0 ? '' : Number(input)
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter Employee email address:"
        },
        {
            type: "input",
            name: "github",
            message: "Enter Github username:",
            validate: input => {
                return input === '' ? "Noone takes an engineer without a Github seriously..." : true;
            }
        },

    ]).then(({ name,id,email,github }) => {
        const newEngineer = new Engineer(name,id,email,github);
        employees.push(newEngineer);
        console.log("------------\nCurrent employees:\n----------\n");
        console.log(employees);
        whatToDo();
    })
};

const createManager = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Manager name:",
            validate: input => {
                return input === '' ? "Please enter a name." : true;
            }
        },
        {
            type: "number",
            name: "id",
            message: "Enter ID number:",
            validate: input => {
                return input === '' ? "Please enter an ID." : true;
            },
            filter: input => {
                return Number.isNaN(input) || Number(input) <= 0 ? '' : Number(input)
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter email address:"
        },
        {
            type: "input",
            name: "officeNumber",
            message: "Enter office number:",
            validate: input => {
                return input === '' ? "Locating a manager requires an office number." : true;
            }
        },

    ]).then(({ name,id,email,officeNumber }) => {
        const newManager = new Manager(name,id,email,officeNumber);
        employees.push(newManager);
        console.log("------------\nCurrent employees:\n----------\n");
        console.log(employees);
        whatToDo();
    })
};

const createIntern = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Intern name:",
            validate: input => {
                return input === '' ? "Please enter a name." : true;
            }
        },
        {
            type: "number",
            name: "id",
            message: "Enter ID number:",
            validate: input => {
                return input === '' ? "Please enter an ID." : true;
            },
            filter: input => {
                return Number.isNaN(input) || Number(input) <= 0 ? '' : Number(input)
            },
        },
        {
            type: "input",
            name: "email",
            message: "Enter email address:"
        },
        {
            type: "input",
            name: "school",
            message: "Enter school attending:",
            validate: input => {
                return input === '' ? "If no school, enter None or Graduate." : true;
            },
        }

    ]).then(({ name,id,email,school }) => {
        const newIntern = new Intern(name,id,email,school);
        employees.push(newIntern);
        console.log("------------\nCurrent employees:\n----------\n");
        console.log(employees);
        whatToDo();
    })
};

const generateHTML= () => {
    const renderedHTML = render(employees);
    fs.writeFile(outputPath, renderedHTML, err =>
    err ? console.error(err) : console.log('Team file updated.')
)

};
whatToDo();