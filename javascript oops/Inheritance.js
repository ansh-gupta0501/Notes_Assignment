class User{
    constructor(username){
        this.username = username
    }

    logMe(){
        console.log(`Username is ${this.username}`);
        
    }
}

//teacher class extends all the properties of user 
class Teacher extends User{
    //if want to override constructor becuase teacher should have its own constructor 
    constructor(username,email,password){
        //for the username :- if classes not there , then we need to use call keyword and pass the this keyword but now due to classes we can just use super keyword 
        super(username) // this super keyword refers to parent class which is User in this case and call the constructor of the User class ,sets the username and can also have access in Teacher , behind the scenes super keyword passes the this keyword
        this.email = email
        this.password = password

    }

    addCourses(){
        console.log(`A new course was added by ${this.username}`)
    }
}

const chai = new Teacher('chai','chai@gmail.com','123')
chai.addCourses() //A new course was added by chai        // we are able to access username in teacher class while writing it in user class 

chai.logMe() // Username is chai

const tea = new User('tea')
tea.logMe() //Username is tea


// checking instance of 
console.log("is chai instance of teacher ",chai instanceof Teacher) // True
console.log("is chai instance of User ",chai instanceof User) // true 
console.log("is tea instance of teacher ",tea instanceof Teacher)  // false
console.log("is tea instance of User  ",tea instanceof User) //true
console.log('is teacher instance of user ',Teacher instanceof User) // false
console.log('is user instance of teacher ',User instanceof Teacher) //false 


console.log("is chai and tea equal ",chai === tea )  // false 
console.log("is chai and teacher equal ",chai === Teacher) //false because chai is instance of teacher


