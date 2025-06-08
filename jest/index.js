import express from 'express'
const app = express()

import {getData} from './handler.js'

export function max(a, b) {
  if (a > b) return a;
  else if (b > a) return b;
  return a;
}


export function calculateAverage(numbers){
  if(numbers.length === 0) return NaN;
  const sum= numbers.reduce((sum,current)=>sum + current,0)
  return sum / numbers.length;
}


app.get('/api/users',getData)

// app.listen(5000,()=>{
//   console.log('server started at port 5000')
// })
