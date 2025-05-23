/* 
JSON.parse(text, reviver)

text: A valid JSON string.

reviver: (Optional) A function to transform the result.
*/

const jsonStr = '{"name":"Ansh","age":25}';

const obj = JSON.parse(jsonStr);
console.log(obj); // Output: Ansh


//with reviver

const json = '{"name":"Ansh","birthYear":2004}';

const user = JSON.parse(json, (key, value) => {
  if (key === "birthYear") {
    return 2025 - value; // Convert to age
  }
  return value;
});

console.log(user); // { name: 'Ansh', birthYear: 27 }
