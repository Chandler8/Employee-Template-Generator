// Manager class that utilizes employee module, it uniquely asks for managers office number

const Employee = require("./Employee");

class Manager extends Employee {
    constructor(name, id, email, officeNo){

        super(name, id, email);

        this.officeNumber = officeNo;
        
    }
    getOfficeNumber(){
        return this.officeNumber;
    }
    getRole(){
        return "Manager";
    }
}

module.exports = Manager;