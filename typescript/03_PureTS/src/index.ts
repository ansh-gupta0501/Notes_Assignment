// classes in typescript


// class User {
//     public email: string  
//     name: string    // if we don't mark any modifier then it is bydefault public 
//     // city: string  // this city will give error if we not initialise in constructor . Property 'city' has no initializer and is not definitely assigned in the constructor. // so either pass it in constructor or initialise it here 
//     city: string = ""
//     readonly state: string = ""
//     private country: string = "" // if we define it private we can't access it outside the class
    
//     // this public private exists in javascript also but there we can marked them as #
//     // #country: string = ""

//     constructor(email: string,name: string){
//         this.email = email   // this.email means the email we define in line no 3 
//         this.name = name
//     }
// }

// const ansh = new User("a@a.com", "ansh")

// console.log(ansh.city) // correct , we can access it 

// // but we can't assign any number to city as it is defined as string 
// // ansh.city = 5 // shows error Type 'number' is not assignable to type 'string'
// ansh.city = 'moga'
// console.log(ansh.city)

// ansh.state = "punjab"  // shows error Cannot assign to 'state' because it is a read-only property

// ansh.country // shows error that Property 'country' is private and only accessible within class 'User'


// ----------------

// shortcut ways for the above class


// class User {
//     readonly city: string = "jaipur"
//     constructor( public email: string, public name:string,private userId: string){  // define modifiers here only 
//     }
// }

// const ansh = new User('h@h.com',"ansh","123")

// console.log(ansh.email) // if we don't define public inside constructor parameter then we get error Property 'email' does not exist on type 'User'
// console.log(ansh.email)  
// console.log(ansh.name)  
// console.log(ansh.city) 
// console.log(ansh.userId) // error property 'userId' is private and only accessible within class 'User


/*
Note :- 

the above is parameter properties in the constructor — a TypeScript feature that lets you declare and initialize class properties directly inside the constructor parameters by prefixing them with modifiers like public, private, or readonly.

class User {
    readonly city: string = "jaipur";

    constructor(
        public email: string,
        public name: string,
        private userId: string
    ) {}
}

👇 Is Equivalent To: 

class User {
    public email: string;
    public name: string;
    private userId: string;
    readonly city: string = "jaipur";

    constructor(email: string, name: string, userId: string) {
        this.email = email;
        this.name = name;
        this.userId = userId;
    }
}

when you use the modifiers in constructor params, you don’t need to write anything else inside the constructor. 🎉



*/


// ------------------------------------------------

// Getters/setters 

class User {
    private _courseCount = 1   // means whenever user comes it get 1 course atleast 
    
    
    readonly city: string = "jaipur"

    constructor( 
        public email: string, 
        public name:string,
        private userId: string
    ){}

    // we can also have private methods

    private deleteToken(){
        console.log('token deleted')
    }

    
    get getAppleEmail(): string{
        return `apple${this.email}`
    } // just append existing email with applekeyword 

   
    
    get courseCount(): number{
        return this._courseCount
    }

    // set courseCount(courseNum): void{ }// we know setter does not return anything . so we must not use return type annotation with setter whether it is void 

    set courseCount(courseNum){
        if(courseNum <= 1){
            throw new Error("course count should be more than 1")
        }
        this._courseCount = courseNum
    }

}

const ansh = new User('h@h.com',"ansh","123")
// console.log(ansh.getAppleEmail) // don't use ansh.getAppleEmail() as it is getter not a function 


console.log(ansh.courseCount); // 1
ansh.courseCount = 50

console.log(ansh.courseCount) // 50

// 3:15:10