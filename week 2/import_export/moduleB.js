import { funcA } from './moduleA.js';

export const funcB = () => {
  console.log('Function B');
  funcA();
};

funcB()