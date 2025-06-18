
// narrowing:- Narrowing in TypeScript refers to the process of refining or reducing a broader type to a more specific one, usually at runtime, so TypeScript can safely understand and check your code.

/* Why is narrowing needed?
When you have a union type (e.g., string | number), TypeScript doesn't know which type is being used at any given moment. Narrowing is how you tell it:
“In this block of code, this value is definitely a string (or number, or something else specific).”
*/

/*
Common Narrowing Techniques:-

1. typeof narrowing:- Used with primitive types like string, number, boolean.
2. in operator narrowing:- Used for checking if a specific property exists in an object type.
3. instanceof narrowing:- Used with classes and constructor functions.



*/


// function detectType(val: number | string){
//     // return val.toLowerCase() // this gives error because there is no mechanism to gurantee that this is 100% string
//     // to solve this , we can use if condition 

//     if(typeof val === "string"){
//        return val.toLowerCase() 
//     }

//     return val + 3        // now works fine    

// }

// but if there is number array then again problem will occur 

function detectType(val: number | string | number[]){
    // return val.toLowerCase() // this gives error because there is no mechanism to gurantee that this is 100% string
    // to solve this , we can use if condition 

    if(typeof val === "string"){
       return val.toLowerCase() 
    }

    // return val + 3       // now shows error Operator '+' cannot be applied to types 'number | number[]' and 'number'    
 
    
}

// we know array is object and typeof(array ) will also come object. so we need to check for object not array 


// type guards :- just use typeof for making an extra guard about what type of variable is coming up 
// ------------------------------------------
 

function provideId(id: string | null){
    if(!id) {
        console.log("Please provide id")
        return ; // this means if id not there then return null
    }

    id.toLowerCase()      
}


// ----------------------------------------------

function printAll(strs: string | string[] | null){
    if(strs){
        if(typeof strs === "object"){   // we know array results into as typeof object 
            for(const s of strs){
                console.log(s)
            }
        } 
        else if(typeof strs === "string"){
            console.log(strs);
        }
    }
}

// in this case we have covered all cases whether there is string , string array or null 
 



// ----------------
interface Dog {
  bark(): void;
}

interface Cat {
  meow(): void;
}

function speak(animal: Dog | Cat) {
  if ("bark" in animal) {
    animal.bark();  // now narrowed to Dog
  } else {
    animal.meow();  // now narrowed to Cat
  }
}



interface User {
    name: string,
    email: string 
}
interface Admin{
    name: string,
    email: string
    isAdmin: boolean 
}

function isAdminAccount(account: User | Admin){
    if("isAdmin" in account){
        return account.isAdmin
    }
}



// ----------------------------------
class Car {
  drive() {}
}

class Bike {
  ride() {}
}

function useVehicle(vehicle: Car | Bike) {
  if (vehicle instanceof Car) {
    vehicle.drive();
  } else {
    vehicle.ride();
  }
}


function logValue(x: Date | string){
    if(x instanceof Date){
        console.log(x.toUTCString)
    }
    else{
        console.log(x.toUpperCase())
    }
}
// ---------------------------------------------------

// 4. Type guards or type predicates (custom narrowing functions)
// You can write custom functions to narrow types.

type Fish = { 
    swim(): void 
};
type Bird = { 
    fly(): void 
};

function isFish(animal: Fish | Bird): animal is Fish {  // by setting animal is Fish  we confirm that if return is true than animal is fish
  return (animal as Fish).swim !== undefined;   // they cast animal as Fish and check whether fist as swim method 
}

function getFood(pet: Fish | Bird){
    if(isFish(pet)){
        // pet // (parameter) pet: Fish | Bird this still does not confirm whether pet is fish or bird. 
                // so this confirmed this use return type of isFish function as animal is Fish 
        return "fish food"
    }
    else{
        return "bird food"
    }
}

function move(animal: Fish | Bird) {
  if (isFish(animal)) {
    animal.swim();  // narrowed to Fish
  } else {
    animal.fly();   // narrowed to Bird
  }
}

/*

### 🔹 Step 1: Define the types

```ts
type Fish = { swim(): void };
type Bird = { fly(): void };
```

* You define two types:

  * `Fish` must have a `swim()` method.
  * `Bird` must have a `fly()` method.

These are **distinct object shapes**, and they don’t overlap.

---

### 🔹 Step 2: Create a **type guard** function

```ts
function isFish(animal: Fish | Bird): animal is Fish {
  return (animal as Fish).swim !== undefined;
}
```

Let’s break this down:

#### ✅ What is a type guard?

* A **type guard** is a function that checks a type at runtime and **tells TypeScript** how to narrow it.

#### 🚨 The key part:

```ts
animal is Fish
```

This return type **tells TypeScript**:

> “If this function returns true, you can treat `animal` as a `Fish`.”

#### 🧠 Inside the function:

```ts
(animal as Fish).swim !== undefined
```

You're:

* Temporarily treating `animal` as a `Fish` (with a type assertion).
* Checking if the `swim` method exists.
* If it does, you assume `animal` is a `Fish`.

---

### 🔹 Step 3: Using the type guard in real code

```ts
function move(animal: Fish | Bird) {
  if (isFish(animal)) {
    animal.swim();  // ✅ TypeScript knows this is a Fish
  } else {
    animal.fly();   // ✅ TypeScript knows this is a Bird
  }
}
```

* Before the `if`, `animal` could be either a `Fish` or a `Bird`.
* After `if (isFish(animal))`, TypeScript **narrows** the type:

  * In the `if` block: `animal` is known to be a `Fish`
  * In the `else` block: `animal` must be a `Bird`

---

### 🧪 Example in action:

```ts
const tuna: Fish = {
  swim: () => console.log("Swimming..."),
};

const sparrow: Bird = {
  fly: () => console.log("Flying..."),
};

move(tuna);    // logs "Swimming..."
move(sparrow); // logs "Flying..."
```

---

### ✅ Summary

| Concept              | Meaning                                                                  |        |
| -------------------- | ------------------------------------------------------------------------ | ------ |
| Union Type           | `animal` can be \`Fish                                                   | Bird\` |
| Type Guard           | `isFish()` checks and **narrows** the type at runtime                    |        |
| TypeScript Narrowing | Inside `if`, the compiler knows the exact type (either `Fish` or `Bird`) |        |
| Benefit              | Safe, readable code with smart autocompletion and no runtime errors      |        |

---


*/





/*
 Why all it matters:

Helps you write safe code with union types.

Allows intelligent auto-completion and type checking in editors.

Prevents runtime errors like calling a method that doesn’t exist on a type.


*/



// -------------------------------------------------------

// Discriminated Unions :- in this it is best practice to use kind in every type 

interface Circle {
  kind: "circle",
  radius: number
}

interface Square {
  kind: "square",
  side: number
}


interface Rectangle {
  kind: "rectangle",
  length: number,
  width: number
}

// type Shape = Circle | Square 

// function getTrueShape(shape: Shape){
//   if(shape.kind === "circle"){
//     return Math.PI * shape.radius ** 2
//   }

//   return shape.side * shape.side

// }



// Exhaustiveness checking 

// function getArea(shape: Shape){
//   switch(shape.kind){
//     case "circle":
//        return Math.PI * shape.radius ** 2
//     case "square":
//        return shape.side * shape.side

//   }
// }

// now suppose in future you modify type Shape to include Rectangle also then our prev getTrueShape() function will show error as we need to put extra condition to solve this error 
// similarly in getArea() function we need to make extra case 
// so exhaustiveness checking says you should always have a default case of type never

 type Shape = Circle | Square | Rectangle

function getArea(shape: Shape){
  switch(shape.kind){
    case "circle":
      return Math.PI * shape.radius ** 2
    case "square":
      return shape.side * shape.side
    case "rectangle":
      return shape.length * shape.width
    default:
      const _exhaustiveCheck: never = shape  // never it means it can never be used means it never assigned a shape 
      return _exhaustiveCheck          // now if we have include rectangle in shape then we must need to make case for rectangle otherwise it will show error 
                                    //Type 'Rectangle' is not assignable to type 'never'

  }
}

