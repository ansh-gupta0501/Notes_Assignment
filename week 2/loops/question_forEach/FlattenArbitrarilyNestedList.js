// // Problem 1: Flatten Arbitrarily Nested List
// //given :- [1, [2, [3, [4]]], 5]

// // flatten to :- [1, 2, 3, 4, 5]

// function flattenArray(arr) {
//     const result = [];

//     function helper(subArr) {
//         subArr.forEach(element => {
//             if (Array.isArray(element)) {
//                 helper(element); // recursion for nested arrays
//             } else {
//                 result.push(element);
//             }
//         });
//     }

//     helper(arr);
//     return result;
// }


// console.log(flattenArray([1, [2, [3, [4]]], 5])); // [1, 2, 3, 4, 5]
