// If an object has a toJSON() method, JSON.stringify() automatically calls it and uses its return value instead of the original object.
//It silently overrides what gets serialized. You might get unexpected output if a library or class has toJSON() defined.
const user = {
  name: "Ansh",
  age: 25,
  toJSON() {
    return {
      userName: this.name,
      isAdult: this.age > 18
    };
  }
};

// const json = JSON.stringify(user);
// console.log(json); // {"userName":"Ansh","isAdult":true}

// ----------------------

// Dates and JSON
// JavaScript Date objects get stringified into ISO format strings. But when parsed, they become plain strings — not Date objects anymore.

const obj = { today: new Date() };

const json = JSON.stringify(obj);
// console.log(json); // {"today":"2025-05-22T10:33:00.000Z"}

const parsed = JSON.parse(json);
// console.log(parsed)
// console.log(parsed.today instanceof Date); // false 
// console.log(typeof parsed.today); // "string"

//  Fix using reviver:

const revived = JSON.parse(json, (key, value) => {
  if (key === "today") return new Date(value);
  return value;
});

// console.log(revived)
// console.log(revived.today instanceof Date); // true 

// -----------------------------------
// in case of classes :-   Loss of Prototypes
// When parsing a JSON string, you get a plain object with no methods or prototype.

class User {
  constructor(name) {
    this.name = name;
  }
  greet() {
    return `Hello ${this.name}`;
  }
}

const user1 = new User("Ansh");
console.log(user1);

const json1 = JSON.stringify(user1);
console.log(json1)
const parsed1 = JSON.parse(json1);
console.log(parsed1)
console.log(parsed1 instanceof User); // false ❌
console.log(parsed1.greet);           // undefined ❌
