//object literal :- simply object 
const user = {
    username : "Ansh gupta",
    loginCount : 8,
    signedIn: true,

    getUserDetails: function(){
        console.log("got user details form database ")
    }
}

// console.log(user.username) 
// console.log(user.getUserDetails())

// there is method map , now how map knows we have to use it in this array or another array , so we need to give context to map
// this is done by (this) keyword 

const user1 = {
    username : "Ansh gupta",
    loginCount : 8,
    signedIn: true,

    getUserDetails: function(){
        // console.log(`Username: ${username}`) // this will not work because , we know in the memory a separate execution context forms for the function so in which it does not know to take username from outside , so we use this 
        // console.log(`Username: ${this.username}`)

        console.log(this) // this will print the current context 
        /* {
            username: 'Ansh gupta',
            loginCount: 8,
            signedIn: true,
            getUserDetails: [Function: getUserDetails]
            } 
        */
    }
}

// console.log(user1.username) 
// console.log(user1.getUserDetails())


// constructor function 
// const data = new Date()
// const promiseOne = new Promise(); // this new keyword is constructor function. this allows to make mulitple instances from one single object which helps us to consume less space in memory 
                                  // but we also want to have new context / values for every new instance , so this new keyword helps to make new context 
                                  // this new is called constructor function 
function user3(username,loginCount,isLoggedIn){
    // username = username  // can't understand which username is variable and which username is passed so we put this 
    
    this.username = username  // this.username is our variable and right side username is value we are passing to the function 
                             // moreover , this is simple object so we can pass anything inside this 
    this.loginCount = loginCount
    this.isLoggedIn = isLoggedIn
    

    this.greeting = function(){
        //console.log(`Welcome ${this.username}`)
    }
    return this  // no need to write (return this )as it implicit return this 
}


// console.log(user3()) // we see along with global properties , these three properties username,loginCount,isLoggedIn also added to this object with value undefined
//console.log(user3("ansh",5,true))  
/*<ref *1> Object [global] {
  global: [Circular *1],
  clearImmediate: [Function: clearImmediate],
  setImmediate: [Function: setImmediate] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  clearInterval: [Function: clearInterval],
  clearTimeout: [Function: clearTimeout],
  setInterval: [Function: setInterval],
  setTimeout: [Function: setTimeout] {
    [Symbol(nodejs.util.promisify.custom)]: [Getter]
  },
  queueMicrotask: [Function: queueMicrotask],
  structuredClone: [Function: structuredClone],
  atob: [Function: atob],
  btoa: [Function: btoa],
  performance: [Getter/Setter],
  fetch: [Function: fetch],
  navigator: [Getter],
  crypto: [Getter],
  username: 'ansh',
  loginCount: 5,
  isLoggedIn: true */

                        


// const userOne = user3('ansh',12,true)
// const userTwo = user3('gupta','11',false)

// console.log(userOne) 

/* in this we saw output 
     structuredClone: [Function: structuredClone],
  atob: [Function: atob],
  btoa: [Function: btoa],
  performance: [Getter/Setter],
  fetch: [Function: fetch],
  navigator: [Getter],
  crypto: [Getter],
  username: 'gupta',
  loginCount: '11',
  isLoggedIn: false


  we see that we print userOne not userTwo but inside this we see values of userTwo not userOne .means userTwo override the values of userOne
  it is not good as values of userOne override by userTwo , therefor we use new keyword 
*/



const userOne = new user3('ansh',12,true)
// const userTwo = new user3('gupta','11',false)
// console.log("userone is ",userOne)
// console.log("userTwo is ",userTwo)

// now we get different users 
// so this new keyword is constructor function which gives new instances always 

//some important points about new keyword 
//- when we use new keyword, empty object created which is called instance
//- a constructor function is called due to new keyword which packs all the arguments 
//- all the arguments injects in (this) keyword
//- finally we get the values in the function


// to check constructor 

console.log("userone is ",userOne.constructor) // output:- userone is [Funtion: user3]
// so constructor property is nothing but just reference to your function 