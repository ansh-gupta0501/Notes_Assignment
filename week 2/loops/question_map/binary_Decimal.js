const binaries = ['1010', '111', '1001'];
const decimals = binaries.map(bin => parseInt(bin, 2));  //parseInt(string, 2) converts a binary string to a decimal number.
console.log(decimals); // [10, 7, 9]


/* 
parseInt takes two arguments:

The string to parse (bin).

The radix/base of the number system to use (2 for binary).
*/
