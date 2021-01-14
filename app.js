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

const empArray = [];
// TODO: use inquirer to ask user questions


function empTypeQuestion(){
  inquirer.prompt([
    {
        type: "list",
        message: "what type of employee do you want to create?",
        name: "empType",
        choices: ["Engineer", "Intern", "Manager", "Quit"]
    }

  ]).then(({ empType }) => {
        switch (empType) {
            case "Engineer":
                createEngineer();
                break;

            case "Intern":
                createIntern();
                break;

            case "Manager":
                createManager();
                break;

            case "Quit":
                console.log("Thanks, you're all set.")
                break;
            
            default:
                break;
        }
    })
};

// TODO: do different things depending on what type of user is selected.
function createEngineer() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Employee name:"
        },
        {
            type: "number",
            name: "id",
            message: "Enter Employee ID number:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter Employee email address:"
        },
        {
            type: "input",
            name: "github",
            message: "Enter Github username:"
        },

    ]).then(({ name,id,email,github }) => {
        const newEngineer = new Engineer(name,id,email,github);
        console.log(newEngineer);
        empArray.push(newEngineer);
        console.log("------------\nCurrent employees:\n----------\n");
        console.log(empArray);
        empTypeQuestion();
    })
};

function createManager() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Manager name:"
        },
        {
            type: "number",
            name: "id",
            message: "Enter ID number:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter email address:"
        },
        {
            type: "number",
            name: "officeNumber",
            message: "Enter office number:"
        },

    ]).then(({ name,id,email,officeNumber }) => {
        const newManager = new Manager(name,id,email,officeNumber);
        console.log(newManager);
        empArray.push(newManager);
        console.log("------------\nCurrent employees:\n----------\n");
        console.log(empArray);
        empTypeQuestion();
    })
};

function createIntern() {
    inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "Enter Intern name:"
        },
        {
            type: "number",
            name: "id",
            message: "Enter ID number:"
        },
        {
            type: "input",
            name: "email",
            message: "Enter email address:"
        },
        {
            type: "input",
            name: "school",
            message: "Enter school attending:"
        }

    ]).then(({ name,id,email,school }) => {
        const newIntern = new Intern(name,id,email,school);
        console.log(newIntern);
        empArray.push(newIntern);
        console.log("------------\nCurrent employees:\n----------\n");
        console.log(empArray);
        empTypeQuestion();
    })
};

empTypeQuestion();



// TODO: use Async to wait to render HTML after questions


// TODO: create objects for each team member according class/subclass

// TODO: after all employees desired, call the `render` function
// TODO: push employee objects into an array

// TODO: pass array of employees to `render` function

// TODO: generate and return HTML blocks according to templates

// render(PUT PARAMETERS HERE);

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

