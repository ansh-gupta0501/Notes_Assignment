# Javascript and classes 

<!-- Javascript is a prototype-based language, and its classes are primarily syntactic sugar over existing prototype-based inheritance mechanisms. 

so while Javascript does have classes, but they work somewhat differently form classes in languages with class-based inheritance, due to javascript's prototype-based nature. -->


class Person {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }

    sayHello(){
        console.log('Hello, my name is ${this.name} and I'm ${this.age} years old')
    }
}

let person1 = new Person('ansh',20);
person1.sayHello();  // output"- Hello, my name is ansh and I'm 30 years old 

## OOP :- It is a programming paradigm which denotes the way of writing program as some prefer to write code using oops or some prefer to write code using functions or some prefer procedural programming. 

## Object
- collection of properties and methods
- eg. toLowerCase

## parts of OOP
Object literal :- a way to create an object by using a concise syntax. It's a list of key-value pairs enclosed in curly braces {}

- Constructor function
- Prototypes
- Classes
- Instances (new , this)


## 4 pillars
Abstraction  :- hide the internal details . eg. fetch 

Encapsulation :- wrap up the data (methods and properties) . provides which data can be accessed or which can't be accessed 

Inheritance :- 

Polymorphism :- one method can do multiple works 


