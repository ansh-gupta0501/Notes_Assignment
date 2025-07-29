
const uppercase = require('upper-case').upperCase

function greet(name){
    console.log(uppercase(`Hello ${name}, welcome to codeevalutoin `));
    
}
greet('anshgupta') // HELLO ANSHGUPTA, WELCOME TO CODEEVALUTOIN

module.exports = greet

