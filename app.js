const Manager = require("./js-folder/manager");
const Engineer = require("./js-folder/engineer");
const Intern = require("./js-folder/intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")

const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./js-folder/htmlRenderer");

const teamMembers = []
const idArray = []

function appMenu(){

console.log("Build your team!");

function createManager(){
inquirer.prompt([
{
    type: "input",
    message: "what is your managers name",
    name: "managerName"
},
{
    type: "input",
    message: "what is your managers id",
    name: "managerId" 
},
{
    type: "input",
    message: "what is your managers email",
    name: "managerEmail"
},
{
    type: "input",
    message: "what is your managers office number",
    name: "managerOfficeNumber"
}
])
.then(answers =>{
    const manager = new Manager(answers.managerName,answers.managerId,answers.managerOfficeNumber,answers.managerEmail)
    teamMembers.push(manager)
    idArray.push(answers.managerId)
    createTeam()
});

};
function createTeam(){
    inquirer.prompt([
        {
            type: "input",
            message: "choose a team member",
            choices: [
                "Engineer",
                "Intern",
                "I dont want to add any more team members"
            ]
        }
    ]).then(userChoice => {
        switch (userChoice.memberChoice) {
            case "Engineer":
                addEngineer()
                break;
            case "Intern":
                    addIntern()
                    break;
            default:
                buildTeam()
                break;
        }
    })

    function addEngineer(){
        inquirer.prompt([
            {
                type: "input",
                message: "engineers name",
                name: "engineerName"
            },
            {
                type: "input",
                message: "engineers id",
                name: "engineerId"
            },
            {
                type: "input",
                message: "engineers email",
                name: "engineerEmail"
            },
            {
                type: "input",
                message: "engineers GitHub username",
                name: "engineerGitHub"
            }
        ])
        .then(answers => {
        const engineer = new Engineer(answers.engineerName,answers.engineerEmail,answers.engineerId,answers.engineerGitHub)

        teamMembers.push(engineer)

        idArray.push(answers.engineerId)
        createTeam()
    })

    }
    function addIntern(){
        inquirer.prompt([
            {
                type: "input",
                message: "interns name",
                name: "internName"
            },
            {
                type: "input",
                message: "interns id",
                name: "internId"
            },
            {
                type: "input",
                message: "interns email",
                name: "internEmail"
            },
            {
                type: "input",
                message: "interns school",
                name: "internSchool"
            }
        ])
        .then(answers => {
            const intern = new Intern(answers.internName,answers.internId,answers.internEmail,answers.internSchool)
            teamMembers.push(intern)
            idArray.push(answers.internId)
            createTeam()
        })

    }
    function buildTeam(){
        if(!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdir(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath,render(teamMembers), "utf-8")
    }
    createManager()
};

};
appMenu()