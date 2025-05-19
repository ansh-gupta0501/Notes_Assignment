// let myName = 'anshgupta'

// //we can access by default properties of string like length
// console.log(myName.length) //9

// myName = 'anshgupta     '
// console.log(myName.length)  //14 due to spaces but we don't want this , we want to make our own method trueLength which gives actual length of the string


let myHeroes = ['thor','spiderman']

let heroPower = {
    thor : 'hammer',
    spiderman : 'sling',

    getSpiderPower : function(){
        console.log(`Spidy Power is ${this.spiderman}`)
    }
}

// now we want to inject a new method named ansh in this heropower object 
// but instead of injecting this method into heropower only we want to inject in Object which is parent of all the arrays,string , functions so that everyone can use this method 

Object.prototype.ansh = function(){
    console.log(`ansh is present in all objects`)
}

heroPower.ansh() //ansh is present in all objects 


// so now array myHeroes also have this ansh method 
myHeroes.ansh() // ansh is present in all objects


// now we want to test that if we inject our function in arrays only , will the Object or string also have access to this ?

Array.prototype.heyAnsh = function(){
    console.log('ansh says hello ')
}

// now myheroes is array so it have access 
// myHeroes.heyAnsh() // ansh says hello 

//check is object has access

// heroPower.heyAnsh() // not having access 

// Object.heyAnsh() // not having access  

// ---------------------------------------------------------

/* Inheritance  */
const User = {
    name : 'ansh',
    email : 'ansh@gmail.com'
}
const Teacher = {
    makeVideo : true
}

const TeachingSupport = {
    isAvailable : false
}

const TASupport = {
    makeAssignments : 'JS assignment',
    fullTime : true,
    __proto__ : TeachingSupport       // TASupport borrows the property of TeachinSupport 
}

// now to link these objects , we have prototype but we have a keyword which is also a property __proto__ which can be used to link these objects

Teacher.__proto__ = User // Now teacher can also access properties of User 

// this is prototypal inheritance 
// but this syntax is old , in modern syntax we have property setPrototypeOf

//modern syntax 

Object.setPrototypeOf(TeachingSupport,Teacher) // teachingsupport access the properties of teacher 

// --------------------------------------------------------
// now to solve our first problem which is making method truelength in string : 

let anotherUsername = 'anshgupta        '
String.prototype.trueLength = function(){
    console.log(`${this}`) //anshgupta  // this keyword refers to the string object (not a primitive string) because you are inside a method attached to String.prototype. 
    console.log(`${this.name}`) //undefined // here we are trying to access the .name property of the string but string objects do not have a .nmae property by default. 
    console.log(`True length is : ${this.trim().length}`) // 9
}

anotherUsername.trueLength() // as anotherUsername is 'anshgupta     ' so this keyword prints the name 