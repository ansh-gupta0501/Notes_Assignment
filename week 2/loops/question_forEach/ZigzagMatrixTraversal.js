// Traverse matrix like this:

// →
// ↓
// ←
// ↓
// →
// ...

function zigzagTraverse(matrix) {
    const result = [];
    const rows = matrix.length;

    for (let i = 0; i < rows; i++) {
        const row = matrix[i];
        if (i % 2 === 0) {
            // left to right
            row.forEach(val => result.push(val));
        } else {
            // right to left
            [...row].reverse().forEach(val => result.push(val));
        }
    }

    return result;
}

/* 
Why use [...row].reverse()?

row.reverse() would mutate the original row array (changing the matrix).

[...row] creates a shallow copy of the row, so reversing it doesn’t affect the original matrix.
*/

console.log(zigzagTraverse([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
]));
// Output: [1, 2, 3, 6, 5, 4, 7, 8, 9]
