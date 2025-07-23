const path = require('node:path')

// console.log(__filename); // C:\Users\ansh.gupta\Documents\Work\nodejs\path.js
// console.log(__dirname); //C:\Users\ansh.gupta\Documents\Work\nodejs


// console.log(path.basename(__filename)); // path.js // last portion of __filename
// console.log(path.basename(__dirname)); // nodejs // last portion of __dirname


// console.log(path.extname(__filename)); //.js // returns extension 
// console.log(path.extname(__dirname)); // empty

// console.log(path.parse(__filename));  
/*
{
  root: 'C:\\',
  dir: 'C:\\Users\\ansh.gupta\\Documents\\Work\\nodejs',
  base: 'path.js',
  ext: '.js',
  name: 'path'
}
*/
// console.log(path.parse(__dirname));

/*
{
  root: 'C:\\',
  dir: 'C:\\Users\\ansh.gupta\\Documents\\Work',
  base: 'nodejs',
  ext: '',
  name: 'nodejs'
}
*/


// console.log(path.format(path.parse(__filename)));   // format method returns a path string if given an object 
// console.log(path.format(path.parse(__dirname)));


// console.log(path.isAbsolute(__filename)) // true   // means it is absolute path 
// console.log(path.isAbsolute(__dirname)) //true

// console.log(path.isAbsolute('./index.js')) // false as it is relative path 



//join method:- it joins all given path segments together using the platform specific separator as a delimiter and then normalizes the resulting path 
// console.log(path.join('folder1','folder2','index.html')) //folder1\folder2\index.html // so these three joined together as platform specific delimeter means forward slash for mac and backslash for windows 

// console.log(path.join('folder1','//folder2','index.html')) // folder1\folder2\index.html      // still have only one slash means join method normalize the path 

// console.log(path.join('folder1','//folder2','../index.html'))  // folder1\index.html // because ../ jumps one folder above

// console.log(path.join(__dirname,'data.json')) // C:\Users\ansh.gupta\Documents\Work\nodejs\data.json


// resolve :- it results a sequence of path or path segments into an absolute path 
// console.log(path.resolve('folder1','folder2','index.html'))  // C:\Users\ansh.gupta\Documents\Work\nodejs\folder1\folder2\index.html // as there is no forward slash in starting so resolve will add an absolute path to the current folder and join the arguments

// console.log(path.resolve('/folder1','folder2','index.html')) //C:\folder1\folder2\index.html // if we use forward slash in starting , then resolve will return an absolute path from that forward slash 

// console.log(path.resolve('/folder1','//folder2','index.html')) //C:\folder2\index.html // if forward slash comes at middle then resolve consider that as the root and ignore previous path 

// console.log(path.resolve('/folder1','//folder2','../index.html'))  // C:\index.html

// console.log(path.resolve(__dirname,'data.json')) //C:\Users\ansh.gupta\Documents\Work\nodejs\data.json

                             



                                          
                                     