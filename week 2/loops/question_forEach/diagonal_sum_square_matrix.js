// Given a 2D square matrix, find the sum of both diagonals using only forEach.

// const matrix = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9]
// ];

function diagonalSum(matrix) {
    let mainSum = 0;
    let antiSum = 0;

    matrix.forEach((row, i) => {
        row.forEach((val, j) => {
            if (i === j) mainSum += val;
            if (i + j === matrix.length - 1) antiSum += val;
        });
    });

    return mainSum + antiSum;
}


console.log(diagonalSum([
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9]
])); // Output: 25



/* 
When you use .forEach(), the callback function receives up to three arguments automatically by JavaScript:

The current element (required)

The current index (optional)

The whole array (optional)

The signature of .forEach() callback:

array.forEach(function callback(element, index, array) {
  // ...
});
element: the current item being processed

index: the position of the current element

array: the original array (rarely needed)


*/