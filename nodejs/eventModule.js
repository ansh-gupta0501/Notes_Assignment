// Events Module 

// The events module allows us to work with events in node js 
// An event is an action or an occurence that has happened in our application that we can respond to 
// Using the events module, we can dispatch our own custom events and respond to those custom events in a non-blocking manner 


const EventEmitter = require("node:events") // events module returns a class called eventemitter which encapsulates functionality to emit events and respond to that event 

// now instatiate the class 
const emitter = new EventEmitter()


emitter.on("order-pizza",(size,topping)=>{
    console.log(`Order recieived! baking a ${size} pizza with ${topping} `);
    
})

emitter.on('order-pizza',(size)=>{
    if(size === 'large'){
        console.log('serving complimentary drink');
        
    }
})


console.log("do work before event occurs in the system "); 

emitter.emit("order-pizza","large","mushroom")



