class User{
    constructor(username){
        this.username = username
    }

    logMe(){
        console.log(`Username : ${this.username}`);
        
    }

    createId(){
        return `123`
    }
}

// const ansh = new User('ansh')
// console.log(ansh.createId())

//but we want not to give access of this method to every object who is instantated with this class 
// for this we use static :- static method block access of method and properties to objects 


class User1{
    constructor(username){
        this.username = username
    }

    logMe(){
        console.log(`Username : ${this.username}`);
        
    }

    static createId(){
        return `123`
    }
}

const ansh = new User1('ansh')
// console.log(ansh.createId())  //TypeError: ansh.createId is not a function , we can't access now as it is static 
// console.log(User1.createId()) // access this createId just be class name 

/* checking in case of inheritance  */

class Teacher extends User1{
    constructor(username,email){
        super(username)
        this.email = email
    }
}

const code = new Teacher('code','code@gmail.com')
// code.logMe(); // can access logMe method 
// console.log(code.createId()) // TypeError: code.createId is not a function

// so static method can't be inherited 

console.log(Teacher.createId())  // 123 // it can be accessable through class 
