// Destructuring in an import statement
// import { multiply } from './utils.js'; // Trying to import `multiply` which does not exist
import * as utils from './utils.js';

console.log(utils.multiply); // undefined, but won't throw an error

// console.log(multiply(2, 3)); // Error: multiply is undefined
