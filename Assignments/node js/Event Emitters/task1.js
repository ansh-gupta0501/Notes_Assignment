// emit a greet event with a listener 


const {EventEmitter} = require('events')

const emitter = new EventEmitter();

emitter.on('greet',(message)=>{
    console.log(message)
})

emitter.on('greet',(message)=>{
    console.log(message)
})

emitter.emit('greet','hlo how are you ')