"use strict";
// tuples are just specialized array with some restrictions given in typescript 
Object.defineProperty(exports, "__esModule", { value: true });
// const user: (string | number)[] = ['hc',1] 
// const user: (string | number)[] = [1,'hc'] // both are right as we see order does not matter that wheter number comes first or string comes first 
// but in some situations , orders matters that we need number first always at 0th position , in this case we use tuple 
var user; // we define tuples that first string will come then number then boolean 
user = ["hc", 131, true];
// user = [131,true,"hc"] // it will show error for the first element that Type 'number' is not assignable to type 'string'
var rgb = [255, 123, 112]; // we don't expect the fourth number , only three numbers 
var newUser = [112, "example@google.com"]; // this new user need to follow the tuple type 
// newUser[1] = 1 // this is not allowed that we can't assign a number at string 
newUser[1] = "hc.com"; // this is allowed 
// so we can overwrite the values 
// bad behavior of tuples 
newUser.push("hello "); // this should not be allowed but this is allowing me 
console.log(newUser);
