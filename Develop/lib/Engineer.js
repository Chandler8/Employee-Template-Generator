// Engineer class that utilizes employee module, it uniquely asks for engineers github

const Employee = require("./Employee");

class Engineer extends Employee {
    constructor(name, id, email, github){

        super(name, id, email);

        this.github = github;
        
    }
    getGithub(){
        return this.github;
    }
    getRole(){
        return "Engineer";
    }
}

module.exports = Engineer;