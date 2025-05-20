/*
  We know there is call stack in which there is global execution context and then function context but we know for every function there forms different execution context so suppose if there is a function inside function , then inside function and outer function both have differnet execution context 
  
*/

// function setUserName(username){
//     console.log("inside setusername function ");
//     // return this 
//    this.username = username
// }

// function createUser(username,email,password){
//     setUserName(username)
//     this.email = email
//     this.password = password
// }

// const chai = new createUser("ansh","ansh@gmail.com","123")

// console.log(chai); // createUser { email: 'ansh@gmail.com', password: '123' }        
                    // we see username is not set 
                    // because inside createUser functin , this setUserName function is not called , it is just referenced not called 
                    // it might be decieving that as we used brackets setUserName() so it must be called, but interally it is not called it is just referneced 
                    // it is called , if we put console statement we see it is called but the thing is , in call stack , when this inner function calls , its executin context removed so it does not contact with the outer function 
                    // we have not hold any reference of this inner function to be used in outer function , so to save reference of this we use call keyword // other method include bind method 
                    //therefore , js has some methods which can be used to explicity call these methods 

function setUserName(username){
    this.username = username
}

function createUser(username,email,password){
    // setUserName.call(username)  // but this also not works because when this function called , the username was saved in inner function(setusername) (this keyword  ) but we want to save it in createUser this keyword , so for this we pass this keyword of createUser to the setUsername
    setUserName.call(this,username) // after execution context removed of setUsername after executing all the data saved in this keyword of createUser 
    this.email = email
    this.password = password
}

// const chai = new createUser("ansh","ansh@gmail.com","123")
// console.log(chai);  
// // now username is set // createUser {
// //   username: 'ansh',
// //   email: 'ansh@gmail.com',
// //   password: '123'
// // }


/* if summarize , call passes the current execution context to other function */


/* 
    In JavaScript, when a function is called, an execution context is created for it. This context is a "container" that keeps track of:

    Variables declared in that function.

    The value of this inside that function.

    Any other details needed for the function to execute properly.

    There are different types of execution contexts:

    Global Execution Context: This is the outermost context that runs when the script starts.

    Function Execution Context: Each time a function is called, a new execution context is created for that function.

    Scenario in the Code
    We have two functions:

    setUserName: This function is supposed to set the username property of an object.

    createUser: This function creates a user by calling setUserName and setting other properties like email and password.

    Here’s what happens when we run the code:

    The Problem:
    js
    Copy
    Edit
    function setUserName(username){
        console.log("inside setusername function ");
        this.username = username;
    }

    function createUser(username, email, password){
        setUserName(username); // The function is called here
        this.email = email;
        this.password = password;
    }

    const chai = new createUser("ansh", "ansh@gmail.com", "123");
    console.log(chai);
    When we call createUser(), JavaScript creates a new execution context for createUser().

    Inside createUser(), we call setUserName(username), which also creates an execution context for setUserName().

    In the context of setUserName(), this refers to a new object that is created when createUser() is called (but it doesn't store the username property as expected).

    Why the username is not set:
    The issue is with the value of this inside setUserName.

    When you call setUserName(username), JavaScript doesn’t know which object should be referenced by this.

    In this case, it assumes that this in setUserName refers to the global object (or undefined in strict mode), not the object created by createUser().

    This results in username not being set on the correct object.

    Fixing the Issue Using call():
    js
    Copy
    Edit
    function createUser(username, email, password){
        setUserName.call(this, username); // Using `call` to pass the correct `this`
        this.email = email;
        this.password = password;
    }

    const chai = new createUser("ansh", "ansh@gmail.com", "123");
    console.log(chai);
    Now, when you use setUserName.call(this, username), you're explicitly telling JavaScript:

    "Use the same this value from the createUser function when calling setUserName."

    This way, this inside setUserName will refer to the same object that createUser is working on, and the username will be set correctly.

    Key Takeaways:
    Execution Context: Every function has its own execution context, and this behaves differently depending on how the function is called.

    this keyword: In JavaScript, this is a reference to the object that is calling the function. If not set explicitly, it might not point to the object you expect.

    call() method: The call() method allows us to explicitly pass a value for this to a function. So when you use setUserName.call(this, username), you're saying "use the this from createUser() in setUserName()".

    Summary:
    By default, this in an inner function (like setUserName) doesn't always refer to the outer function's this.

    You can use call() to ensure that the inner function uses the same this as the outer function.

    This is a way to manage the execution context and ensure the correct this is used when calling a function inside another function.

*/

/*
 This problem can also be solved by other ways 
*/
//  Using arrow functions inside createUser()
// Not applicable directly to the setUserName as a standalone function, but if you refactor setUserName as an inline function inside createUser(), arrow functions inherit this from their parent scope.


function createUser(username, email, password) {
    const setUserName = (username) => {
        console.log(this)
        this.username = username;
    };
    setUserName(username);
    this.email = email;
    this.password = password;
}

// const chai =  new createUser('ansh gupta','ansh@gmail.com','123')
// console.log(chai)

/* 
   if we don't use new keyword in const chai = new createUser() then console.log(chai) gives undefined and console.log(this) gives global object but 
   if we use new keyword  then console.log(chai) gives the correct object and console.log(this ) gives createUser {} 


    Case 1: createUser(...) — called like a regular function
No new keyword means it's a normal function call, not a constructor.

In non-strict mode, this inside createUser() refers to the global object (window in browsers, global in Node.js).

In strict mode, this would be undefined.

➡️ Therefore:

this.username = username; sets a property on the global object.

The function doesn't return anything, so chai becomes undefined.


 Case 2: new createUser(...) — called as a constructor
JavaScript creates a new empty object: this = {}.

this inside the function refers to this new object.

If you don’t return anything, JavaScript will automatically return this new object.

➡️ Therefore:

this.username = ..., this.email = ... assign properties to the new object.

chai gets assigned this newly constructed object.


Why console.log(this) behaves differently in both cases

➤ Inside an arrow function:

const setUserName = (username) => {
    console.log(this);
};
Arrow functions do not have their own this.

Instead, they lexically bind this — they inherit it from the enclosing scope.

So:

In Case 1 (no new), the arrow function inherits this from the global context.

In Case 2 (new), the arrow function inherits this from the createUser function’s this, which is the newly created object.




*/
