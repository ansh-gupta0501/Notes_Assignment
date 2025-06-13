// Redis Streams

// It is a data structure that acts like an append-only log but also implements several operations to overcome some of the limits of a typical append-only log. These include random access in O(1) time and complex consumption strategies, such as consumer groups. You can use streams to record and simultaneously syndicate events in real time. Examples of redis stream use cases including:
// - Event sourcing (eg. tracking user actions, clicks,etc)
// - sensor monitoring (eg. reading from devices in the field)
// - Notifications (eg. storing a record of each user's notifications in a separate stream) 


// Basic commands
// XADD adds a new entry to a stream.
// XREAD reads one or more entries, starting at a given position and moving forward in time.
// XRANGE returns a range of entries between two supplied entry IDs.
// XLEN returns the length of a stream.


import client from './db.js'

export async function streams(){
    // console.log(await client.xadd('temperatures:us-ny:10007','*','temp_f','87.2','pressure','29.68','humidity','46'))   // 1749730592563-0  // 17 : 46 : 32  12 Jun 2025 // it is timestamp-0 // this timestamp depict when this entry was formed and 0 depics that is this timestamp if more entries are formed  // * means “Add this entry to the stream and automatically generate a unique ID based on the current timestamp.”
                                                                                                                    //  means if concurrentlty , within a second , large amount of data come , like in sensors , then 0 will be increases

    console.log(await client.xrange('temperatures:us-ny:10007','1749730592563-0','+'.'COUNT','2'))                                                                                                                 

}