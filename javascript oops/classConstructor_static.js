class User{
    // when object get initialize using the new keyword , this constructor is called 
    constructor(username,email,password){
        this.username = username
        this.email = email,
        this.password = password
    } //no need to write constructor evertime but yes if want to modify anything you need to write 

    // a method  :- no need to write function keyword 
    encryptPassword(){
        return `${this.password}abc`
    }

    changeUsername(){
        return `${this.username.toUpperCase()}`
    }


}

//creating user 
const chai = new User('anshgupta','gupta@gmail.com','123')
console.log(chai.encryptPassword()) //123abc
console.log(chai.changeUsername()); //ANSHGUPTA

/*  behind the scenes   */


function User1(username,email,password){
        this.username = username
        this.email = email,
        this.password = password
}         

User1.prototype.encryptPassword = function(){
     return `${this.password}abc`
}
User1.prototype.changeUsername = function(){
    return `${this.username.toUpperCase()}`
}

const tea = new User1('gupta','ansh@gmail.com','567')
console.log(tea.encryptPassword()) //567abc
console.log(tea.changeUsername()); //GUPTA

// we can be able to do like this because whether it is a function but it behaves like an object 