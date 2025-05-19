//read command line args using process.argv

console.log(process.argv[0]) //node executable path 
console.log(process.argv[1]) // path of file which is executed 
console.log(process.argv[2]) // command line argument passed
console.log(process.argv[3]) 


const arg = process.argv.slice(2) // returns new array starting from index 2 or original array 
console.log(arg)

//converting string argument to number
 
const argNum = process.argv.slice(2).map((ele) => (Number(ele)))
console.log(argNum)

