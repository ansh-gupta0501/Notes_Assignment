// Redis list are linked list of string values. Redis lists are frequently used to :
// implement stacks and queues
// build queue management for background worker systems.

// list is an array 

//basic commands 
// LPUSH adds a new element to the head of a list; 
// RPUSH adds to the tail.
// LPOP removes and returns an element from the head of a list; RPOP does the same but from the tails of a list.
// LLEN returns the length of a list.
// LMOVE atomically moves elements from one list to another.
// LRANGE extracts a range of elements from a list.
// LTRIM reduces a list to the specified range of elements.

// to make this list as queue ,  insert from left and remove from right 
// to make this list as stack ,  insert from left and remove from left 

// 

import client from './db.js'


export async function list(){
    // console.log(await client.lpush('messages','hey'))       // will insert hey from left side at index 0 // but it will return 1 which means 1 element added 
    // console.log(await client.lpush('messages','hello'))     // will insert hello from left side at index 0. hey will be shifted to index 1 // this will return 2 means 2 elements added
    // console.log(await client.del('messages'))           // will delete the messages list 
    
    // console.log(await client.rpush('messages',"bye"))  //return 3 bye will be inserted from right side at index 2
    // console.log(await client.del('messages','2'))         


    // console.log(await client.lpop('messages') ) // remove hello  and it also returns hello 
    // console.log(await client.rpop('messages') ) // remove bye  and it also returns bye 
    
    // console.log(await client.llen("messages"))  // 1

    

    // understanding lmove , ltrim , lrange 

    // console.log(await client.rpush('messages',1,2,3,4)) //[1,2,3,4]
    // console.log(await client.rpush('messages',1,2,3,4)) //[1,2,3,4,1,2,3,4]


    // console.log(await client.ltrim('messages',4,7))   // [1,2,3,4] 

    // console.log(await client.lrange('messages',1,3)) // [ '2', '3', '4' ]

    // console.log(await client.rpush('message2',1,2,3,4)) 

    // console.log(await client.lmove('messages','message2','LEFT','RIGHT'))   // it returns 1   // messages2 will be[1,2,3,4,1] and messages will be [2,3,4]

    
    // to read list , we can't use get with list , we need to use range to read list , we can use range 0 to -1 to print full list 
  
    // console.log(await client.keys('user:*'))    // returns all the keys starting from user 
  
    // blocking commands 

//     BLPOP removes and returns an element from the head of a list. If the list is empty, the command blocks until an element becomes available or until the specified timeout is reached.
//     BLMOVE atomically moves elements from a source list to a target list. If the source list is empty, the command will block until a new element becomes available.



}




