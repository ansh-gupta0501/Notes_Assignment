//Recursively remove falsy values (false, 0, null, undefined, NaN, "") from an array, even inside nested arrays.

function deepFilter(arr) {
  return arr
    .filter(item => Boolean(item))

    .map(x => Array.isArray(x) ? deepFilter(x) : x);
}

// console.log(deepFilter([0, 1, [false, 2, [null, 3]]]));
// → [1, [2, [3]]]


/* 
  Step-by-step Explanation:
Input:

[0, 1, [false, 2, [null, 3]]]

🔁 Step 1: .filter(Boolean)
Removes all falsy values at the current array level.

After .filter(Boolean) on outer array:

[1, [false, 2, [null, 3]]]
0 is removed because it's falsy.

🔁 Step 2: .map(...)
Loop over the elements:

1 → Not an array → Keep as is.

[false, 2, [null, 3]] → It’s an array → Call deepFilter recursively on it.

🔄 Recurse on [false, 2, [null, 3]]
.filter(Boolean) → [2, [null, 3]]

.map(...)

2 → Keep as is

[null, 3] → Call deepFilter again

🔄 Recurse on [null, 3]
.filter(Boolean) → [3]

.map(...) → 3 is not an array → return [3]

⬆️ Going back up
[null, 3] → [3]

So [false, 2, [null, 3]] → [2, [3]]

Final Result:
js
Copy
Edit
[1, [2, [3]]]
*/