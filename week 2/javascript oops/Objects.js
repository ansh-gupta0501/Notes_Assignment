// can we change the value of Math.PI ??

// console.log(Math.PI);
// Math.PI = 5;
// console.log(Math.PI)      // value not changed 


const descriptor = Object.getOwnPropertyDescriptor(Math,'PI')

// console.log(descriptor);
/* 
{
  value: 3.141592653589793,
  writable: false,
  enumerable: false,
  configurable: false
}                   // as we see it is writeable false, we can't change the value 

*/

// we can also define these type of properties to our object so that no one can change them 

// creating object using factory function(create)

const myObj = Object.create(null)  // default value is null
// console.log(myObj)


// or simple create obj 

const chai = {
    name: 'ginger chai',
    price: 250,
    isAvailable: true,
    func : function(){
        console.log("function")
    }
    
}

// console.log(chai);
// now we want to set properties of these

// console.log(Object.getOwnPropertyDescriptor(chai)) // undefined
                                                    // because chai is object not property, properties are name , price , isAvailable of object chai 


// console.log(Object.getOwnPropertyDescriptors(chai,'name')) // we want name property of chai 
/* 
{
  value: 'ginger chai',
  writable: true,
  enumerable: true,
  configurable: true
}
*/


//looping on object if enumerable is true 

for(let [key,value] of Object.entries(chai)){
    if(typeof value != 'function')
    console.log(`key is ${key}, value is ${value}`);
}



// now define your own properties 

Object.defineProperty(chai,'name',{
    value : 'tea',
    writable : false,
    // enumerable : false,
    configurable : false,
})

// console.log(Object.getOwnPropertyDescriptor(chai,'name'))
/* 
{
  value: 'ginger chai',
  writable: false,
  enumerable: false,
  configurable: false
}
*/


//looping on object when enumerable is false 

for(let [key,value] of Object.entries(chai)){
    if(typeof value != 'function')
    console.log(`key is ${key}, value is ${value}`);
}

// key is price, value is 250
// key is isAvailable, value is true // we are able to loop on only price and is available not on name as name is set enumerable false 


chai.name = 'changed'

console.log(chai)  // can't changed because writable is false 

const fruit = {};
 
Object.defineProperties(fruit, {

    "name": {

        value: "APPLE", // Only setting value, no descriptors for writable, enumerable, configurable
        // enumerable:true,
        // configurable:true,
        // writable:true        // if we don't write these properties , then by default there values are false, and object will return {} as enumerable is false  but if we make object using object literal then by default these properties come true 

    }

});
 
// console.log(Object.getOwnPropertyDescriptor(fruit, "name"));
// console.log(fruit);

