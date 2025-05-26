function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
}

console.log(transpose([
  [1, 2, 3],
  [4, 5, 6]
]));
// [[1, 4], [2, 5], [3, 6]]


/* 
 Basic syntax of .map()

array.map(callback(currentValue, index, array), thisArg);
Parameters:
callback — Function
A function that is called once for every element in the array.

The callback function can take up to three arguments:

currentValue: The current element being processed in the array (required)

index (optional): The index of the current element

array (optional): The original array that .map() was called on

thisArg (optional) — Value
Value to use as this when executing the callback.

What .map() does:
Calls the callback on each element of the array.

Returns a new array containing the results of calling the callback on every element.

Does not mutate the original array.


*/


/*
What is thisArg in .map()?
.map() optionally accepts a second argument, called thisArg.

This argument sets the value of this inside the callback function.

Why is this useful?
Sometimes, you want your callback to use properties or methods from a certain object, and using thisArg lets you control what this refers to inside the callback.

Syntax recap:

array.map(callback, thisArg);
callback — function to run on each element.

thisArg — value to use as this inside the callback.

Example WITHOUT thisArg

const obj = {
  multiplier: 3
};

const numbers = [1, 2, 3];

// Regular function, 'this' is undefined (or global in non-strict mode)
const result = numbers.map(function(num) {
  return num * this.multiplier;  // 'this.multiplier' is undefined here
});

console.log(result); // [NaN, NaN, NaN]

Example WITH thisArg

const obj = {
  multiplier: 3
};

const numbers = [1, 2, 3];

// Pass 'obj' as thisArg
const result = numbers.map(function(num) {
  return num * this.multiplier;
}, obj);  // <-- thisArg here

console.log(result); // [3, 6, 9]
Here, inside the callback function:

this refers to obj (because we passed it as thisArg).

So, this.multiplier evaluates to 3.

Key notes:
If you use an arrow function for the callback, thisArg is ignored because arrow functions don’t have their own this.

Example:


numbers.map(num => num * this.multiplier, obj); // `this` here is not `obj`


*/
/*
What does _ mean?
_ is commonly used as a placeholder for a parameter that you don't actually need or care about.

It means: "Yes, this function receives an argument here, but I won't use it."

It’s a convention to signal to readers that this parameter is intentionally ignored.

In your example:

matrix[0].map((_, colIndex) => ...)
.map() provides two arguments to the callback:

The current element (we don’t need it here, so it’s named _)

The current index (colIndex), which we do need

Since the first argument is not used inside the function, naming it _ is a way to say “I’m ignoring this.”

Could you use a different name?
Yes! This would work exactly the same:

matrix[0].map((element, colIndex) => ...)
But since element is never referenced, many developers use _ to make it clear that the first argument is intentionally unused.


*/