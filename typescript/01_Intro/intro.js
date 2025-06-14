var user = {
    name: 'ansh',
    age: 20
};
console.log('ansh gupta');
console.log(user.name);
// console.log(user.email); // this will give an error before compiling because email is not defined in the user objectl. But in javascript file we get error after compiling 
// this all thing cannot be executed at all in the type script format 
// this is where your installation of tsc or the typescript comes into . so run this using command tsc fie_name.ts
// when we run this command , a new js file will automatically created with the same name as the ts file 
// so this command converts the typescript file into javascript file 
// not the file will still be converted to javascript if there is any error in typesciprt file. But can also restrict this with some configruations 
