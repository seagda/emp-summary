class Employee {
    constructor(name,id,email){
        this.name = name;
        this.email = email;       
        this.id = id;

    };

    getRole() {
        return "Employee";
    };

    getName(){
        return this.name;
    };

    getId(){
        return this.id;
    };
    
    getEmail(){
        return this.email;
    };

};

module.exports = Employee;