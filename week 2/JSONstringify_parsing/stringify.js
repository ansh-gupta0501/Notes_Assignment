/* JSON.stringify(value, replacer, space)

value: The object to convert.

replacer: (Optional) A function or array to filter what gets stringified.

space: (Optional) A number or string for pretty-printing (indentation).

*/

const obj = { name: "Ansh", age: 25, skill : 'dev' };

const jsonStr = JSON.stringify(obj);
// console.log(jsonStr); // Output: {"name":"Ansh","age":25}
// console.log(typeof jsonStr)

//pretty print
// const pretty = JSON.stringify(obj, null, 1);
// console.log(pretty);
/*
{
  "name": "Ansh",
  "age": 25
}
*/

//replacer

const obj2 = { name: "Ansh", age: 25, password: "1234" };

const result = JSON.stringify(obj2, (key, value) => {
  if (key === "password") return undefined;
  return value;
});

console.log(result)// Output: {"name":"Ansh","age":25}


//These are ignored or removed during JSON.stringify(): Functions, undefined, and Symbols
const obj1 = {
  name: "Ansh",
  greet: function () { return "Hi"; },
  id: undefined,
  symbol: Symbol("id")
};

// console.log(obj1.symbol)

// console.log(JSON.stringify(obj1)); // Output: {"name":"Ansh"}
