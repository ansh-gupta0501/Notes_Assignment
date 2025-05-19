// starvation 

/*
Starvation in the context of an event loop refers to a situation where certain tasks or processes(usually lower - priority tasks) are deferred or never get executed because higher - priority tasks continually take precedence.

In an event-driven system or an event loop , tasks or events are typically processed in the order they arrive. However, if the system is constantly busy processing high-priority events, lower-priority ones may not get the chance to execute, resulting in starvation.


Examples of Event Loop Starvation:
JavaScript/Node.js Event Loop: If you have long-running synchronous tasks (like heavy computations) in a Node.js event loop, these can block the event loop and prevent other tasks, such as I/O events or scheduled timers, from executing. In this case, even if lower-priority tasks are ready to run, they can "starve" because the event loop is always busy with the long-running tasks.

Priority-based Scheduling: In an event loop system where tasks are scheduled based on priority, lower-priority tasks may get starved if higher-priority tasks keep entering the queue or keep executing repeatedly.

HOW TO PREVENT STARVATION :- 

Fair Scheduling: Use techniques such as round-robin scheduling or time slicing, where tasks are given a certain time slot to run before switching to others, preventing one task from monopolizing the event loop.

Task Prioritization: Properly assign priorities to tasks so that lower-priority tasks do not block critical system processes but are still able to execute in a timely manner.

Asynchronous and Non-blocking Code: In environments like JavaScript, ensuring that long-running operations are non-blocking (e.g., using setTimeout, setImmediate, or Promises) can help avoid blocking the event loop.

Offload Intensive Work: In cases where heavy computations are needed, offloading them to separate threads (if available) or worker processes can help prevent starvation of other tasks in the event loop.

Starvation can lead to performance bottlenecks and poor system responsiveness, so it’s important to manage the task queue and execution flow efficiently.

*/



// A long-running synchronous task (this simulates starvation)
function longRunningTask() {
  let start = Date.now();
  while (Date.now() - start < 5000) { // Runs for 5 seconds
    // This will block the event loop for 5 seconds
  }
}

// A task that will "starve" because of the long-running task
function starvationTask() {
  console.log("Starvation task is running.");
}

// Simulate starvation
console.log("Starting long-running task...");
longRunningTask();

// This task will never get a chance to run because the event loop is blocked
setTimeout(starvationTask, 1000);




// ----------------------------------------------------------------------------
// preventing this starvation using setTimeOut 

function longRunningTaskWithYield() {
  let start = Date.now();
  let end = start + 5000;
  
  function processChunk() {
    if (Date.now() < end) {
      // Simulate some work being done in chunks
      setTimeout(processChunk, 0); // Yield control back to the event loop
    }
  }
  
  processChunk();
}

function starvationTask() {
  console.log("Starvation task is running.");
}


console.log("Starting improved long-running task...");
longRunningTaskWithYield();

// Now, the starvation task will have a chance to run because the event loop is not blocked
setTimeout(starvationTask, 1000);


// preventing using promises 

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}           // promise to resolve after 0 sec

async function longRunningTaskWithPromise() {
  const end = Date.now() + 5000; // Run for 5 seconds

  while (Date.now() < end) {
    // Simulate a chunk of work
    for (let i = 0; i < 1e6; i++) {
      
      Math.sqrt(i);
    }

    // Yield control to the event loop
    await sleep(0); 
  }
}

console.log("Starting improved long-running task with promises...");

longRunningTaskWithPromise();

setTimeout(() => {
  console.log("Starvation task is running.");
}, 1000);




