//Bind in javascript :- 

const obj = {
  name: "John",
  greet: function() {
    console.log(`Hello, ${this.name}!`);
     
  }
};

// const greetFunc = obj.greet
// console.log(greetFunc)
// obj.greet()
// greetFunc()
// const greetFunc = obj.greet();

const greetFunc = obj.greet.bind(obj);
// greetFunc(); // Output: Hello, John!

// -----------------------------------------------------------

// Partial Function Application (Creating Pre-configured Functions)

function multiply(a, b) {
  return a * b;
}


// const multiplyByTwo = multiply.bind(null, 2);  // null is fixing this reference
// console.log(multiplyByTwo(5)); // Output: 10


//-------------------------------------------------------------------------
//  Ensuring Correct this in Asynchronous or Callback Functions
// In asynchronous code (like in setTimeout, setInterval, or event listeners), this can be lost because these functions might not run in the context you expect. Using bind() ensures that this refers to the correct object.

class Timer {
    constructor() {
        this.time = 0;
        // setInterval(this.incrementTime.bind(this), 1000); 
        setInterval(this.incrementTime, 1000); 
    }

    incrementTime() {
        this.time++;
        console.log(this.time);
    }
}

 const timer = new Timer(); 

// -----------------------------------------------------------
//  Using bind() to Borrow Methods

// In JavaScript, you can "borrow" methods from other objects and call them with the this context of your choosing. This is useful when you want to call a method of one object, but with a different object as the this context.
const person = {
    name: 'Alice',
    greet: function() {
        console.log(`Hello, ${this.name}`);
    }
};

const anotherPerson = {
    name: 'Bob'
};

// Borrow greet() method from person and bind it to anotherPerson
const greetBob = person.greet.bind(anotherPerson);
// const greetBob = person.greet
// greetBob(); // Output: Hello, Bob



// -------------------------------------------------
//  Binding Methods in Classes to Maintain this
// This is a very common use case (like in your code), where methods need to be bound to a specific instance of a class, especially when dealing with event handlers or callbacks.
class MyClass {
    constructor() {
        this.value = 42;
        // this.increment = this.increment.bind(this);  // Bind the method in the constructor
        this.increment = this.increment    
      }


    increment() {
        this.value++;
        console.log(this.value);
    }
}

const myInstance = new MyClass();
setTimeout(myInstance.increment, 1000); // Works as expected: prints 43



