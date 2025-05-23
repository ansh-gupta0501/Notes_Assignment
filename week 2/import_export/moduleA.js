import { funcB } from './moduleB.js';

 export const funcA = () => {
  console.log('Function A');
  funcB();
};

funcA()