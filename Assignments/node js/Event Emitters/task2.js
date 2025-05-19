//create a class that extends event emitters 

const {EventEmitter} = require('events')

class task2 extends EventEmitter{
    constructor(){
       super();
    }
}

const emitter = new task2();

emitter.on('click',(message)=>{
    console.log("1st click event ",message)
})

emitter.on('click',(message)=>{
    console.log("2nd click event ",message)
})

emitter.on('scroll',(message)=>{
    console.log("1st scroll event",message)
})

emitter.on('scroll',(message)=>{
    console.log('2nd scroll event ',message)
})


emitter.emit('click','user clicked ')
emitter.emit('scroll','user scroll ')
emitter.emit('scroll','user scroll again  ') // won't trigger listener  because it automatically turn off due to once 

//Show listeners for a specific event
console.log('Listeners for "click" event:', emitter.listeners('scroll'));

// Show event names with listeners
console.log('Current event names with listeners:', emitter.eventNames());

//  Show the number of listeners for a specific event
console.log('Number of listeners for "scroll":', emitter.listenerCount('scroll'));


const clickListener = (message) => {
    console.log('Click event removed:', message);
};
// emitter.on('click', clickListener);
emitter.removeListener('click', clickListener);
console.log('Listener removed for "click" event.');

// 6. Remove all listeners for 'scroll'
emitter.removeAllListeners('scroll');
console.log('All "scroll" listeners removed.');

emitter.removeAllListeners('click');

// 7. Emit events again after removing listeners
console.log('\nAfter removing a listener:');
emitter.emit('click', 'User clicked again!');
emitter.emit('scroll', 'This will not be handled');

// 8. Checking the number of listeners after removal
console.log('Number of listeners for "click" after removal:', emitter.listenerCount('click'));

