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

// Array to receive new employee objects
const employees = [];

// Make a pretty header
console.log("\n")
console.log("-".repeat(71));
console.log("|"+" ".repeat(69)+"|");
console.log("|"+" ".repeat(20)+"Welcome to the Team Generator"+" ".repeat(20)+"|");
console.log("|"+" ".repeat(69)+"|");
console.log("-".repeat(71)+"\n\n");


// Prompt user to take an action
 const whatToDo = () => {
  
  inquirer.prompt([
    {
        type: "list",
        message: "What do you want to do?",
        name: "action",
        choices: ["Add Engineer", "Add Intern", "Add Manager", "Update Team Page", "Quit Application"]
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

            case "Update Team Page":
                generateHTML();
                break;

            case "Quit Application":
                quitApplication();
                break;
            
            default:
                break;
        }
    })
};

const quitApplication = () => {
    inquirer.prompt([
        {
            type: "confirm",
            name: "confirm",
            message: "Quit without updating Team Page first? Your data will be lost.",
        }
 
    ]).then(({ confirm }) => {
        if (confirm === false) {
            return whatToDo()
        } else {
            console.log("-".repeat(70));
            console.log("Thank you, and goodbye.");
            console.log("-".repeat(70));
        }

    });   
};

const returnEmployees = () => {
    console.log("\n")
    console.log("-".repeat(71));
    console.log("|"+" ".repeat(10)+"You are adding the following employees:"+" ".repeat(20)+"|");
    console.log("-".repeat(71)+"\n\n");
    console.log(employees);
    console.log("-".repeat(71)+"\n\n");  
} 

const createEngineer = () => {
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
                return input === '' ? "Please enter a numerical ID." : true;
            },
            filter: input => {
                return Number.isNaN(input) || Number(input) <= 0 ? '' : Number(input)
            }
        },
        {
            type: "input",
            name: "email",
            message: "Enter Employee email address:",
            validate: input  => {
                const regexEml = /^\S+@[^@\s]+\.[^@\s]+$/;
                return regexEml.test(input.toLowerCase()) ? true : "Please enter a valid email.";
                }
        },
        {
            type: "input",
            name: "github",
            message: "Enter Github username:",
            validate: input => {
            //    return input === '' ? "Noone takes an engineer without a Github seriously..." : true;
            const regexGitHub = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;
            return regexGitHub.test(input.toLowerCase()) ? true : "Please enter a valid gitHub username.";
            }
            
        },

    ]).then(({ name,id,email,github }) => {
        const newEngineer = new Engineer(name,id,email,github);
        employees.push(newEngineer);
        returnEmployees();
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
            message: "Enter email address:",
            validate: input  => {
                const regexEml = /.+@.+\..+/;
                return regexEml.test(input.toLowerCase()) ? true : "Please enter a valid email";
                }
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
        returnEmployees();
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
            message: "Enter email address:",
            validate: input  => {
                const regexEml = /^\S+@[^@\s]+\.[^@\s]+$/;
                return regexEml.test(input.toLowerCase()) ? true : "Please enter a valid email.";
                }
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
        returnEmployees();
        whatToDo();
    })
};

const generateHTML= () => {
    const renderedHTML = render(employees);
    fs.writeFile(outputPath, renderedHTML, err =>
    err ? console.error(err) : console.log('\nTeam file updated.\nThanks, and goodbye.\n\n')
)

};

whatToDo();