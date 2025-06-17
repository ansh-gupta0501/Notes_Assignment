// tuples are just specialized array with some restrictions given in typescript 

// const user: (string | number)[] = ['hc',1] 
// const user: (string | number)[] = [1,'hc'] // both are right as we see order does not matter that wheter number comes first or string comes first 

// but in some situations , orders matters that we need number first always at 0th position , in this case we use tuple 

// so tuples allowes us to fix array length and array order

let user: [string,number,boolean] // we define tuples that first string will come then number then boolean 

user = ["hc",131,true]

// user = [131,true,"hc"] // it will show error for the first element that Type 'number' is not assignable to type 'string'

let rgb: [number,number,number] = [255,123,112] // we don't expect the fourth number , only three numbers 


// ---------------------
type User = [number,string]   // we are defining type as tuple

const newUser: User = [112,"example@google.com"]  // this new user need to follow the tuple type 


// newUser[1] = 1 // this is not allowed that we can't assign a number at string 
newUser[1] = "hc.com" // this is allowed 
// so we can overwrite the values 

// bad behavior of tuples 

newUser.push("hello ") // this should not be allowed but this is allowing me 
/*
tuples in TypeScript are based on arrays, and arrays allow methods like push, which means you can still use .push() to add elements, 
and TypeScript won’t prevent it at runtime, although it may warn you during development depending on your tsconfig.


At compile time: TypeScript might give a warning like:

Argument of type 'string' is not assignable to parameter of type 'never'.
...if strict settings are enabled (like strictTupleChecks).

At runtime: JavaScript just executes the .push() and appends "hello".


To enforce immutability or prevent this behavior, you can:

Use readonly:

type User = readonly [number, string];
Or avoid mutating tuples directly, using non-mutating methods.


If you're not using any tsconfig.json file, TypeScript uses its default compiler options, which means:

strict mode is off by default, including strictTupleChecks.

TypeScript is less strict about enforcing exact tuple lengths.

 No compile-time error or warning
No runtime error
 Output will be:

 [112, "example@google.com", "hello"]
 
TypeScript allows the push() even though you've defined a tuple with only 2 elements. Why?

Because without strict checks, TypeScript treats tuples more like regular arrays and doesn't enforce exact length constraints.
*/

export {}