Events

Events are things that happen in the system you are programming - the system produces(or "fires") a signal of some kind when an event occurs , and provides a mechanism by which an action can be automatically taken (that is , some code running ) when the event occurs


use cases for event handling :-
1. may be you want to respond to some type of system events.
2. mouse clicks
3. key presses
4. async progress events :- you are uploading a large file , and you want the notifications so that the users knows the progress of that upload . So you will need to have some custom code that executes every time there is an update from that overall async process 


import EventEmitter from "node:events"      // this allows us to both listen for events as well as emit our own custom events. 

// create an emitter and use the constructor pattern on this EventEmitter object  

const emitter = new EventEmitter();

// add an event handler

emitter.on('hello', message => {
console.log(`Event handled : ${message}`);
}) // this hello is string identifier for the particular event and then we will have a function that will execute when we receive that event 

now we need to actually emit this event and verify that we can receive it. 

// emit the event after 3 second delay 

setTimeOut(()=>{
emitter.emit('hello','This is a message from the event ');
},3000)           // now we need to add in the logic to actually fire this event or emit the event . 

now , we should see that after 3 seconds, we get a message stating that the event has been handled , and then we display the message that was sent out through the event that was emitted 


-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Event Emitters

Design an EventEmitter class in js that supports the following methods:

- on(event,listener) : Subscribes or register a listener function to an event 
- emit(event,...args) : calls all listeners associated with that event, passing them the arguments
- off(event,listener) : Removes a specific listener from an event 
- once(event, listener) : Registers a listener that runs only once . it runs for the first event only 


observer pattern :- let say you have an class/object in which we can register observers. if that class/object changes then we need to tell observers that it is changed.

observer is a behavioral design pattern that lets you define a subscription mechanism to notify multiple objects about any events that happen to the object they 're observing .

eg.   we have add multiple subscriber to our application , now whenever there is update , we have to update all the subscribers 



class MyEventEmitter {
  constructor(){

  // make object of event states (__this.event_listeners)
  // [event] : listener[]    // event is key whose value is listeners array 
    
   this.__event_listeners = {};
  
    
  }
  on(event, listener){
   // for which particular event , we have to call this listener function. Register the  //[listener] for the [event ].  means we have to maintain array for the listeners and we// map the particular event with the particular listener 

so in constructor , make object  for event states 

//check this key(event) exits in object(__event_listeners)

if(!this.__event_listeners[event]){
   // first initialist with empty array 
   
   this.__event_listeners[event] = [];
  }
   
 //now we push this particular listener to this event 

this.__event_listeners[event].push(listener);
return true;      //event registerd successfuly 

  }

  emit(event, ...args){
    firstly check if there is any particular listener for that event

   if(!this.__event_listeners[event]) return false;
    
    //if exists then bring all the listeners registers with this event 

   const listeners = this.__event_listeners[event]
   
   // now loop on listernes and call each listeners by passing arguments along 

   listeners.forEach((listener)=>listener(...args))
    
  }

  off(event,listener){
   
  if(!this.__event_listeners[event]){ return false} 
  
  // now finding index of this listener in the array for this event 
   const index = this.__event_listeners[event].indexOf(listener)
   
  if(index < 0) { return false} // means listener did not exist for this event 

  // if found remove the listener from the array in this index using splice method 
  this.__event_listeners[event].splice(index,1)
return true 
  }

  once(event,listener){
   // runs for first event after automattically off 

    const wrapperFunc = (...args) => {
    listener(...args);

   this.off(event,wrapperFunc) ;
 };        we first call this listener function , and then off this 

  // now register this wrapper func for this event 

 this.on(event, wrapperFunc)
return true;
   
  }
}


//making object of class MyEventEmitter

const e = new MyEventEmitter();
 // now first register the event (suppose user sign up event ) using on
// we want that when user signups we want to email user , whatsapp user 
e.on('user:signup', (username)=>console.log('user sign up ' ))
e.on('user:signup', (username)=>console.log('sending email to ' ,username))
e.on('user:signup', (username)=>console.log('whatsapp to ',username  ))

// making another event user log out 

e.on('user:logout',(username)=> console.log('logout',username))

// now emit 

e.emit('user:signup','@ansh');


// if we run this code , we get output 
user sign up 
sending email to @ansh
whatsapp to @ansh
 

//now emiting or signing more user 
e.emit('user:signup','@ansh1')
e.emit('user:signup','@ansh2')

// now logout first user 

e.emit('user:logout','@ansh')

// onrunning this code 


user sign up 
sending email to @ansh
whatsapp to @ansh
user sign up 
sending email to @ansh1
whatsapp to @ansh1
user sign up 
sending email to @ansh2
whatsapp to @ansh2
logout @ansh


// now e.off , 

const sendwhastapp = (username) => console.log('whatsapp to ',username  )
e.on('user:signup', (username)=>console.log('user sign up ' ))
e.on('user:signup', (username)=>console.log('sending email to ' ,username))
e.on('user:signup', sendwhastapp )
e.on('user:logout',(username)=> console.log('logout',username))


e.emit('user:signup','@ansh')
e.emit('user:signup','@ansh1')

e.off('user:signup',sendwhastapp)

e.emit('user:signup','@ansh2')
e.emit('user:logout','@ansh')

//now this code output , WhatsApp will not send to @ansh2 as we off the event before signing @ansh2

// in once , it runs for first event after that it automatically off 


-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Asynchronous Event Handling 

till this , all listeners are executed synchronously when an event is emitted. However, in many real-world applications, you might want to perform asynchronous operations when handling events (e.g., making network requests, reading from a database, etc.).

Solution: You can make listeners asynchronous by using async functions. This means that when an event is emitted, the listener functions will return a promise, and you can handle those asynchronously.

class MyEventEmitter {
  constructor() {
    this.__event_listeners = {};
  }
  
  async emit(event, ...args) {
    if (!this.__event_listeners[event]) return false;
    
    const listeners = this.__event_listeners[event];
    for (let listener of listeners) {
      await listener(...args); // Await the result if listener is async
    }
  }
}

const e = new MyEventEmitter();
e.on('event', async () => {
  console.log('Event listener started');
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Event listener finished');
});

e.emit('event');


output :- 
Event listener started
(1 second delay)
Event listener finished

---------------------------------------------------------------------------------------------------------------------------------------
2. Error Handling in Event Emitters
When you're dealing with event-driven systems, error handling becomes very important. If an error occurs in one of the listeners, it can potentially break the event flow, especially in production environments.

Solution: Wrap your listener function calls in a try-catch block to gracefully handle errors.

class MyEventEmitter {
  constructor() {
    this.__event_listeners = {};
  }

  emit(event, ...args) {
    if (!this.__event_listeners[event]) return false;

    const listeners = this.__event_listeners[event];
    listeners.forEach(listener => {
      try {
        listener(...args);
      } catch (error) {
        console.error(`Error occurred in listener for event '${event}':`, error);
      }
    });
  }
}

const e = new MyEventEmitter();
e.on('event', () => {
  throw new Error('Listener error');
});

e.emit('event'); // Will log the error message


This ensures that if one listener fails, it doesn't stop the other listeners from being executed.

--------------------------------------------------------------------------------------------------------------------------------
3. Event Priorities (Listener Priority)
Sometimes, you might want to control the order in which listeners are invoked, especially if some listeners need to be executed before others.

Solution: Implement priority levels when adding listeners.

class MyEventEmitter {
  constructor() {
    this.__event_listeners = {};
  }

  on(event, listener, priority = 0) {
    if (!this.__event_listeners[event]) {
      this.__event_listeners[event] = [];
    }

    this.__event_listeners[event].push({ listener, priority });
    this.__event_listeners[event].sort((a, b) => b.priority - a.priority); // Sort by priority
  }

  emit(event, ...args) {
    if (!this.__event_listeners[event]) return false;

    const listeners = this.__event_listeners[event];
    listeners.forEach(({ listener }) => listener(...args));
  }
}

const e = new MyEventEmitter();
e.on('event', () => console.log('High priority listener'), 10);
e.on('event', () => console.log('Low priority listener'), 1);

e.emit('event');
// Output: 
// High priority listener
// Low priority listener

-----------------------------------------------------------------------------------------------------------------------------
⏱️ 8. Event Throttling and Debouncing
These are techniques used to control how often a function is executed, especially for high-frequency events like scroll, resize, mousemove, or real-time data input.

1. Debouncing
Debouncing means delaying execution of a function until a specified amount of time has passed without the event happening again.

📘 Example:
User is typing in a search box. You only want to send a network request after the user stops typing for 500ms.


function debounce(fn, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId); // Clear any previous call
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

// Usage
const logSearch = debounce(query => console.log("Searching for", query), 500);

logSearch("a");
logSearch("an");
logSearch("ans");
logSearch("ansh"); // Only this will trigger after 500ms of inactivity

2. Throttling
Throttling means ensuring a function only runs once every X milliseconds, no matter how many times the event fires.

📘 Example:
You want to log scroll position, but no more than once every 1 second.


function throttle(fn, limit) {
  let lastCall = 0;
  return (...args) => {
    const now = Date.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      fn(...args);
    }
  };
}

// Usage
const handleScroll = throttle(() => {
  console.log('Scrolled at', new Date().toISOString());
}, 1000);

// Attach to scroll event
window.addEventListener('scroll', handleScroll);


🧠 How to Use with Event Emitters?
You can wrap your listeners with debounce or throttle functions when registering them:

const emitter = new MyEventEmitter();

// Throttled listener
const throttledListener = throttle((msg) => console.log('Throttled:', msg), 1000);

emitter.on('data', throttledListener);

emitter.emit('data', 'event1');
emitter.emit('data', 'event2'); // May be skipped if within 1 sec

-------------------------------------------------------------------------------------------------------------------------------------

🧩 5. Event Bubbling and Propagation
🔍 What is it?
Event bubbling is a concept borrowed from the DOM (Document Object Model) in browsers. In the DOM, when an event occurs (like a click), it starts from the innermost element and "bubbles" up through its ancestors unless stopped.

In the context of custom event emitters, this concept can be useful if you have a hierarchical or nested emitter system, where one emitter is a "child" and others are "parents". You might want to allow an event to be handled at multiple levels.

🏗️ Why use it?
Modular design: Each module or component can handle events locally and still allow them to bubble up to the parent module.

Centralized logging or monitoring: The parent can monitor or log all events happening in children.

Reuse common behavior: E.g., a default handler for unhandled events in parent emitter.

class MyEventEmitter {
  constructor(parent = null) {
    this.__event_listeners = {};
    this.__parent = parent; // Reference to parent emitter
  }

  on(event, listener) {
    if (!this.__event_listeners[event]) {
      this.__event_listeners[event] = [];
    }
    this.__event_listeners[event].push(listener);
  }

  emit(event, ...args) {
    let handled = false;
    if (this.__event_listeners[event]) {
      this.__event_listeners[event].forEach(listener => listener(...args));
      handled = true;
    }

    // Bubble to parent if exists
    if (this.__parent) {
      this.__parent.emit(event, ...args);
    }

    return handled;
  }
}
🔁 Usage

const parent = new MyEventEmitter();
const child = new MyEventEmitter(parent);

parent.on('data', data => console.log('Parent received:', data));
child.on('data', data => console.log('Child received:', data));

child.emit('data', 'Event bubbling test');
Output:

Child received: Event bubbling test
Parent received: Event bubbling test
The event bubbles from child to parent.

🛑 Optional: Stopping Propagation
You can modify the code to optionally stop propagation, similar to how event.stopPropagation() works in DOM.

emit(event, ...args) {
  let shouldBubble = true;

  if (this.__event_listeners[event]) {
    this.__event_listeners[event].forEach(listener => {
      const result = listener(...args);
      if (result === false) shouldBubble = false;
    });
  }

  if (shouldBubble && this.__parent) {
    this.__parent.emit(event, ...args);
  }
}
A listener can return false to stop the bubbling.




-------------------------------------------------------------------------------------------------------------------------------------------------------
 mini chat room project 


in ChatRoom.js file 

const EventEmitter = require('events');  // Importing EventEmitter from Node.js

class ChatRoom extends EventEmitter {
  constructor() {
    super();
    this.users = [];  // Array to store the users in the chat room
  }

  // Method for users to join the chat room
  join(user) {
    this.users.push(user);  // Add user to the list
    console.log(`${user} joined the chat!`);
    this.emit('userJoined', user);  // Emit a 'userJoined' event
  }

  // Method for sending messages
  sendMessage(user, message) {
    console.log(`${user}: ${message}`);  // Print the message to the console
    this.emit('newMessage', user, message);  // Emit a 'newMessage' event
  }

  // Method for users to leave the chat room
  leave(user) {
    const index = this.users.indexOf(user);  // Find the user's index in the list
    if (index !== -1) {
      this.users.splice(index, 1);  // Remove the user from the list
      console.log(`${user} has left the chat.`);
      this.emit('userLeft', user);  // Emit a 'userLeft' event
    }
  }
}

module.exports = ChatRoom;  // Export the class for use in other files



in index.js file 

const readline = require('readline');  // Importing the readline module to interact with the user
const ChatRoom = require('./chatRoom');  // Import the ChatRoom class

const rl = readline.createInterface({
  input: process.stdin,  // Input from the terminal
  output: process.stdout  // Output to the terminal
});

const chatRoom = new ChatRoom();  // Create a new ChatRoom instance

// Listen for events and display them in the console
chatRoom.on('userJoined', (user) => {
  console.log(`${user} has joined the chat room.`);  // Display message when a user joins
});

chatRoom.on('newMessage', (user, message) => {
  console.log(`${user}: ${message}`);  // Display message when a new message is sent
});

chatRoom.on('userLeft', (user) => {
  console.log(`${user} has left the chat room.`);  // Display message when a user leaves
});

// CLI interface to interact with the chat room
rl.question('Enter your username to join the chat: ', (username) => {
  chatRoom.join(username);  // Add the user to the chat room

  // Start receiving messages
  rl.on('line', (input) => {
    if (input === 'exit') {  // If the user types "exit", leave the chat
      chatRoom.leave(username);
      rl.close();
    } else {
      chatRoom.sendMessage(username, input);  // Send the message to the chat room
    }
  });
});


----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

Worker Threads :- It Gives you straightforward api to deal with CPU-Intensive tasks while still maintaining a responsive application. 

The node event loop is great at letting you asynchronously offload I/O Operations, but the single threaded nature of the event loop means that there's not a great way to deal with long running CPU-intensive tasks, until recently worker threads give you a way to send those types of workloads to another thread while keeping your main thread available for a new user request. Worker threads in Node are very similar to web workers that are available in browsers. The problems they solve are the same and the APIs are similar, but there are some differences just due to the different runtime environments.

Each worker thread instance is really a new instance of the event loop. 

The application receives a request to do some work, and the event loop picks it up and takes care of it. 

Creating a new worker thread effectively gives you another event loop.
The benefit of this is that running a CPU bound task here leaves your event loop on the main thread free to continue handling user requests .

However you are able to pass messages back and forth between the main thread and the worker thread. Also creating a new worker is as easy as calling the worker constructor, so if you determine you need more than one you can easily create as many as you need.

// first import the worker_threads module

const {Worker} = require('worker_threads');

// creating a worker 

const firstWorker = new Worker('cpu_intensive.js')  // instantiate a new instance of the worker class and pass to the constructor a JavaScript file containing the code the worker 
should execute.  The worker will immediately begin executing the code inside the file on a different thread from the one running the main Node event loop.

// a second option you have for creating a worker is to pass the code you wanted to execute directly inside the constructor as a string literal. 

const secondWorker = new Worker(`console.log('Do CPU-intensive stuff here...');`,{eval : true});
 // this second property eval let node know that it should interpret the first parameter as the acutall code to execute


// there is a third option that lets you use the code in the same file without passing it all to the constructor 

const {Worker, isMainThread} = require('worker_threads')

if you referenence isMainThread and it returns true then you know you're running on the main thread. If it returns false, then you know you're running on a worker thread  

if(isMainThread){
  const thirdWorker = new Worker(__filename);
}
else{
// worker thread code goes here...
}

Therefore , you can check to see if you're on the main thread before instantiating a new worker and passing it __filename as the file to execute. That will create a new worker tat also executes the code in this file. 

However isMainThread will return false for it so you just include the worker thread code inside the else block.

------------------------------

now let's look how a worker thread can take the pressure off the main thread and keep your apps responsive.


console.log('starting the main thread')

console.log('Getting started')
wasteTime(2000)
console.log('In the middle')
wasteTime(2000)
console.log('All done')

console.log('Still in the main thread. ')


function wasteTime(delay){
 const end = Date.now() + delay;
 while(Date.now() < end) {}
}

function that simulate work that blocks the event loop.
we know this code blocks the event loop and keeps any other code from executing during that time. Above the function there are couple of log statements that just remind us the code is executing on the main thread. Between them, I log that the code is getting started and then i call the wasteTime function and have it blocked for 2 seconds.
It then reports the code is in the middle before blocking for another 2 seconds and finally reporing that it's all done 

if we run this code , we get output 
Starting the main thread
Getting started
In the middle(after wait for 2 seconds)
All done(after wait for 2 seconds)
Still in the main thread. 

we get these because none of the code is in asynchrous and it's all running on the same thread 

now let's now modify this to have a worker thread execute all of the blocking code. 

const {Worker, isMainThread, parentPort} = require('worker_threads')
if(isMainThread){

console.log('starting the main thread')

const worker = new Worker(__filename);

console.log('Still in the main thread. ')


}else{

console.log('Getting started')
wasteTime(2000)
console.log('In the middle')
wasteTime(2000)
console.log('All done')         // all these else code is blocking code 

}

now to show how the worker thread can communicate back to the main thread using parentPort

Rather than log messages to the console in the worker thread, i am going to send those messages from the worker back to the main thread to handle as it pleases. I can do that by replacing  console.log with a call to parentPort.postMessage. ParentPort is a communication port back to the main thread. It is also an EventEmitter. Whatever i pass to postMessage will be passed as a message event back to the main thread.
Now add the event handler to the main thread code . The event will be emitted on the worker instance .  you can register event handlers by calling the on function and pass it the name of an name of an event and a function that should execute when the event is emitted. 

The name of the event sent across the parentPort is message . I will write a handler function that just takes the string it receives and logs it to the console .
That string will be whatever was passed to the postMessage calls below. I will 
prefix the output with the word worker, so we now it was a message received from the worker and logged inside the main thread. 

if(isMainThread){

console.log('starting the main thread')

const worker = new Worker(__filename);
worker.on('message',(msg) => {
 console.log('Worker : ${msg}')
})

console.log('Still in the main thread. ')


}else{

parentPort.postMessage('Getting started')
wasteTime(2000)
parentPort.postMessage('In the middle')
wasteTime(2000)
parentPort.postMessage('All done')         // all these else code is blocking code 

}

on running the code , output is 

Starting the main thread
Still in the main thread
Worker : Getting started(after 2 sec)
Worker : In the middle (after 2 sec)
Worker : All done 

we see we immediately got the output from the two log statemets at the beginning and end of the main thread

in this the function blocking the worker event loop which left the main event loop free to continue processing user request.