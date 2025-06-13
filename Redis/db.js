//connection with ioredes

import { Redis } from 'ioredis'


const redis = new Redis({
  host: process.env.host, 
  port: process.env.port,                  
  password: process.env.password,
//   tls: {}                        // optional: add TLS options if Redis Cloud requires SSL/TLS
});




export default redis 