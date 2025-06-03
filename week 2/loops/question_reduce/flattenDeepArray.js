// function flattenDeep(arr) {
//   return arr.reduce((acc, val) =>
//     acc.concat(Array.isArray(val) ? flattenDeep(val) : val), []);
// }

// console.log(flattenDeep([1, [2, [3, [4]]]])); //  [1, 2, 3, 4]


function flattenDeep(arr) {
  return arr.reduce((acc, val) =>
    acc.concat(Array.isArray(val) ? flattenDeep(val) : val), []);
}


const arr1 = [1, 2, [3, 4]];

const arr2 = [[5, 6], 7, 8];
const arr3 = arr1.concat(arr2);
// console.log(arr3); //[ 1, 2, [ 3, 4 ], [ 5, 6 ], 7, 8 ]

// const arr4 = [1,2,3]
const arr4 = []
const val = 5;


const ans = arr4.concat(val);
console.log(ans)

