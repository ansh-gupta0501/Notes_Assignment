// function flattenDeep(arr) {
//   return arr.reduce((acc, val) =>
//     acc.concat(Array.isArray(val) ? flattenDeep(val) : val), []);
// }

// console.log(flattenDeep([1, [2, [3, [4]]]])); //  [1, 2, 3, 4]


function flattenDeep(arr) {
  return arr.reduce((acc, val) =>
    acc.concat(Array.isArray(val) ? flattenDeep(val) : val), []);
}


