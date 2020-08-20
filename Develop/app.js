// Node Package Dependencies
const inquirer = require("inquirer");
const fs = require("fs");

// NPM modules we need to import from other parts of our directory
const Manager = require("./lib/Manager");
const Intern = require("./lib/Intern");
const Engineer = require("./lib/Engineer");

// Beginning of Async function
async function start(){
    console.log("Build your dream team, Avengers assemble!");

    // Hold the HTML
    let teamHTML = "";

    // Holds the amount of team members
    let teamSize;

    // Start of loop
    await inquirer.prompt(
        {
            type: "number",
            message: "How many people are in your team?",
            name: "noOfTeamMem"
        }
    )
    .then((data) => {

        // We start user off at a team size of 1
        teamSize = data.noOfTeamMem + 1;
    });
    
    // In the event the user inputs a team size of zero, the app will not run and present the user the following message
    if (teamSize <= 1){
        console.log("Go hire some people, teamwork makes the dreamwork!");
        return;
    }
    
    // This loop will compensate for any team size
    for(i = 1; i < teamSize; i++){

        // Create global variables that will be assigned later
        let name;
        let id;
        let title;
        let email;

        // We give the user broad questions that; managers, interns, and engineers will all inherit from the employee class
        // From these prompts, we will then later ask the questions specific to the role of the employee (i.e how interns come with a university name)
        await inquirer.prompt([ 
            {
                type: "input",
                message: `What is employee (${i})'s name?`,
                name: "name"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s id?`,
                name: "id"
            },
            {
                type: "input",
                message: `What is the employee (${i})'s Email?`,
                name: "email"
            },
            {
                type: "list",
                message: `what the employee (${i})'s title?`,
                name: "title",
                choices: ["Engineer", "Intern", "Manager"]
            }
        ])
        .then((data) => {

            // Once the user has input this information, we store it in global variables
            name = data.name;
            id = data.id;
            title = data.title;
            email = data.email;
        });

        // Implement switch cases depending on the title of the employee
        switch (title){
            case "Manager":

                // Manager's come with an office number unique to them
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your office number?",
                        name: "officeNo"
                    }
                ])
                .then((data) => {

                    // Take given user data to create new object
                    const manager = new Manager(name, id, email, data.officeNo);

                    // Create a new variable to hold HTMl input
                    teamMember = fs.readFileSync("templates/manager.html");

                    // We need to pass template literals from our HTML files, eval lets us do this here
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

            // Intern requires a unique school name
            case "Intern":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What school is your Intern attending?",
                        name: "school"
                    }
                ])
                .then((data) => {
                    const intern = new Intern(name, id, email, data.school);
                    teamMember = fs.readFileSync("templates/intern.html");
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

            // Engineer requires a unique Github username
            case "Engineer":
                await inquirer.prompt([
                    {
                        type: "input",
                        message: "What is your Engineer's GitHub?",
                        name: "github"
                    }
                ])
                .then((data) => {
                    const engineer = new Engineer(name, id, email, data.github);
                    teamMember = fs.readFileSync("templates/engineer.html");
                    teamHTML = teamHTML + "\n" + eval('`'+ teamMember +'`');
                });
                break;

        }

    }

    // Place the HTML in a variable for later
    const mainHTML = fs.readFileSync("templates/main.html");
    
    // Call on eval to allow us to use back ticks (template literals) so we can put teamHTML in the changeable template
    teamHTML = eval('`'+ mainHTML +'`');

    // use FS write file method create the new team.html file that will hold the user input and style it for them.
    fs.writeFile("output/team.html", teamHTML, function(err) {

        if (err) {
          return console.log(err);
        }
      
        console.log("HTML page team.html successfully created!");
      
      });

}


start();