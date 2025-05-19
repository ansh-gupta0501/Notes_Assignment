//there is javascript behavior which is called prototypal behavior

//in the browser console , when we run this type of code, 
// const newHero = ['hulk','spiderman']

// console.log(newHero)

// we see output as 

// (2) ['hulk', 'spiderman']
// 0 : "hulk"
// 1 : "spiderman"
// length : 2
// [[Prototype]] : Array(0)       // this prototype contains many methods related to array like forEach, indexOf,join,map 
                                // also scrolling down we see [[Prototype]] : Object // this confirms protypal behaviour of javascript that it looks in the upper layer even if founds it in lower layer , 
                                // this is also called prototypal inheritance 

/*
    javascript default behaviour is prototypal behaviour which means if javascript does not find anything , he looks for it in the upper layer till he finds it or finds null. javascript access its parents, grandparents to find things 
    this is reason why arrow functions don't have this keyword , or the concept of this keyword and new keyword , the classes concepts and the prototypal inheritance concept is also due to this concept
*/


// now we know everything in javascript is object like array , string etc.    ,
//parent of all these is object but object does not have any parent so object parent refers to null 

// Array -> object -> null
// String -> object -> null

// but what about function ? is function object or functin 

function mulitpleBy5(num){
    return num * 5;
}

mulitpleBy5.power =2 // means we can also use . opearator with functions which confirms functions are also object 

console.log(mulitpleBy5(5)) // 25

console.log(mulitpleBy5.power) // 2 

console.log(mulitpleBy5.prototype) // {}

// this prototype does not give only method but give some internal properties also , so this function (multipleBy5) should also have some internal properties 

function createUser(username,score)
{
    this.username = username
    this.score = score

}

// as functions are objects , so can inject our own functions into this using prototype , so lets inject increment property in the createUser 
createUser.prototype.increment = function(){
   // score++  // if we write without this keyword,     function does not know the current context as there are multiple users which will use this function , so tell current context we use this keyword 
    this.score++;
}
createUser.prototype.printMe = function(){
    console.log(`score is ${this.score}`)
}

// const ansh = createUser('ansh',50)
// const gupta = createUser('gupta',100)

// now to call this , we don't need to write ansh.prototype.increment as javascript behind the scenes himself do this 
// ansh.increment()
// gupta.increment()

// this will not work , gives error cannot read properties of undefined because properties are injected succesfully but while tranfer the function call to variable ansh(const ansh = createUser()) , we need to tell that new properties are added , and this will done by new keyword 

const ansh = new createUser('ansh',50)
const gupta = new createUser('gupta',100)

ansh.printMe() // score is 50
gupta.printMe() //score is 100

ansh.increment()
gupta.increment()

ansh.printMe() // score is 51
gupta.printMe() // score is 101

/*
    BTS FOR  new keyword :-

    A new object is created: The new keyword initiates the creation of a new Javascript object.
   
    A prototype is linked:- The newly created object gets linked to the prototype property of the constructor function. javascript does not gives constructor function through classes , it gives it through new keyword . But for the ease of development , javascript made it easy with classes , otherwise without classes we can still use constructor function through new keyword,  This means that 
    it has access to properties and methods defined on the constructor's prototype.

    The constructor is called : The constructor function is called with the specified arguments and this is bound to the newly created object.
    If no explicit return value is specified from the constructor, javascript assumes this, the newly created object, to be the intended return value. 

    The new object is returned: After the constructor function has been called , if it doesn't return a non-primitive value(object, array, function,etc.), the newly created object is returned 
    for eg. in the above function createUser , we get in ansh variable 
*/

