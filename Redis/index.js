import 'dotenv/config'
// import { createClient } from 'redis';


// const client = createClient({
//     username: process.env.redit_username,
//     password: process.env.password,
//     socket: {
//         host: process.env.host,
//         port: process.env.port
//     }
// });

// client.on('error', err => console.log('Redis Client Error', err));

// await client.connect();


// await client.set('foo', 'bar');
// const result = await client.get('foo');

// await client.quit();

// console.log(result)  // >>> bar



// -----------------------------------------------------
// connection with ioredis

import ioredis from './db.js'


ioredis.on('connect', () => {
  console.log('Connected to Redis Cloud!');
});

ioredis.on('error', (err) => {
  console.error('Redis connection error:', err);
});


// calling string file 
import {string} from './string.js'
// string()
import {list} from './list.js'
// callin list file
// list()

import { sets } from './sets.js';
// sets()

import { hashes } from './hashes.js';
// hashes()

//streams

import { streams } from './streams.js';
streams()