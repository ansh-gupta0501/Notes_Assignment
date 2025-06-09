# Unit Testing

### Roadmap
- Introduction to Unit Testing
- Core unit testing techniques
- Breaking dependencies with Mocks
- Improving code quality with static Analysis Tools

### What is Unit Tesing?
- A form of automated testing where we write code to test our code 
- For Example 

```javascript
function calcPayment(principal,interest,years){}    
``` 

- To test this function manually, we need to first launch the application , log in , navigate to page , fill out the form , submit it and then check the result is calculated correctly or not . So this is very time consuming so here automated testing comes 

- We can write some code and directly call this function with various inputs adn check if it returns the correct result

```javascript
const resutl = calcPaymetn(10000,5,5);
expect(result).toBe(188.71);
```
- we execute this code using a program called testRunner which displays a test results on console or termianl window 

- **Refactoring** - Changing the structure of the code without changing its behaviour or functionality . For eg. Moving a few lines of code to a function .

### Benefits to Unit Testing
- Detects bugs early before deployment
- Facilates refactoring
- Improves code quality by consider variaous edge cases and error conditions
- Documentation to understand how a functional would behave
- Unit Testing is an investment in quality

### Types of Tests
- Unit Test
- Integration Test
- End to End test

### Unit Tests
- Can be functions, classes, or even small modules
- Unit test catches bugs early in the development process

### Integration Tests
- focus on verifying how different units or components of your application work together as a whole . They help to identify issues arise when combinng different units such as data flow programs , communicatin between  modules and compability issues between components

### End to end test
- focus on testing the entire application as a whole
- E2E tests simulate user interactions with the entire system from user interface down to the backend services

### testing framework 
- We need a testRunner to execute our tests. Here testing frameworks come 
- Testing Framework are set of tools for writing and running tests which includes a test runner, assertion libraries(to check if the code behaves as expected ), mocking tools(to replace certain modules with Fakes simulating different scenerios), coverage tools(for measuring how much of the code is tested ) 

### Popular Frameworks
- Jest --- Experimental support for ECMAScript Modules
- Mocha
- Jasmine
- Vitest --- Support ESM , TypeScript , and jsx
- Cypress
- Playwright

### Setting up Vitest
- npm i -D vitest
- create a script in package.json file as "test" : "vitest"

### Writing your first tests

```javascript
export function max(a, b) {
  if (a > b) return a;
  else if (b > a) return b;
  return a;
}
```
- now in the root folder of the project , create a test folder and make a test file for this code (intro.test.js) (this is the pattern that vitest just looks for)(vitest bydefault looks for file that have test in their name but this can be configured )

- in this file , we import few functions from vitest . One is describe for creating a test Suite or group of realted tests. Second is test for creating a test case . Third is it. Fourth is expect

```javascript

import {describe, test,it,expect} from 'vitest';
import {max} from "../src/intro"

describe('max',()=>{

    it('should return the first argument if it is greater',()=>{

        //AAA 
        // Arrange - in this phase we set up our test environment including any necessary data or configurations
        // Act - In this phase we perform the action we want to test 
        // Assert - In this phase we check the outcome to ensure that it matches our expectations


        //Arrange

        const a = 2;
        const b = 1;    // as we testing for first argument , so take any value but first argument should be greater 

        // Act phase
        const result = max(a,b);

        //Assert phase

        expect(result).toBe(2) // expect returns an expectation object. In this object , we have a bunch of methods that starts with to. (these are called matchers we use these to verify expectations). We use method toBe matcher 

        // so this means we expect the result to be 2



    }); // it also accepts two arguments, first is string that represents our test name.So in our function first test cases if a > b. so we name it like "should return the first argument if it is greater". The second argument is a function  that will be executed by our test runner(vitest). In the function we typically structure our test using the AAA patern that is short for Arrange ACT Assert. This is a pattern that people follow when organizing their tests


    // making another test case
    it('should return the second argument if it is greater',()=>{
        expect(max(1,2)).toBe(2);
    });

    //making another test case 
    it('should return the first argument if arguments are equal',()=>{
        expect(max(1,1)).toBe(1);
    });



}) // it accepts two arguments. First is string that is the name of our test suite. Typically we use the name of the function or the unit under test. The second argument is a function that will be called by our test runner(vitest).In this funcition we define one or more test cases so we call 'test' or 'it'. 


```

- Now we have covered test for this function . So now we can refactor this function as 


```javascript
export function max(a, b) {
  return (a > b) ? a : b
}
```

- if we now run test, we get our result passed . It will give immediate feedback if we have broken something during our refactorings
- like if in this refactoring code , we write  return (a > b) ? a : a . then our  test will be failed

### Test-Driven Development

- there are two things do production code first then test , test first then write production code
- the second appraoch is called test - driven development(Tdd)
- In tdd, we start by writing a failing test. Then write just enough code to make the test pass and then if necessary refactor the code

- writing test for average of values in an array by writing a failing test

```javascript
export function calculateAverage(numbers){
    //implemetn later after testing

    // // to pass second test just write
    // if(numbers.length === 0) return NaN;
    // return numbers[0];

    // // to pass third case 
    // const sum= numbers.reduce((sum,current)=>sum + current,0)
    // return sum / numbers.length;

    // // BUT TO PASS FIRST TEST JUST IMPLEMENT 
    // return NaN;

    
    // if we combine all these we can produce function as 
    
    if(numbers.length === 0) return NaN;
    const sum= numbers.reduce((sum,current)=>sum + current,0)
    return sum / numbers.length;
}
```
```javascript

describe('calculateAverage',()=>{
    it('should return NaN IF given an empty array',()=>{
        expect(calculateAverage([])).toBe(NaN);
    });

     it('should Calculate teh average of an array with a single element ',()=>{
        expect(calculateAverage([1])).toBe(1);
    })

     it('should Calculate teh average of an array with a two element ',()=>{
        expect(calculateAverage([1,2])).toBe(1.5);
    })


     it('should Calculate teh average of an array with a three element ',()=>{
        expect(calculateAverage([1,2,3])).toBe(2);
    })

})

```

### Isolating Units - Mocking (Intermediate)
- **Mock Functions** let you isolate the unit being tested from external dependencies like databases

- Let's say you have a service:
```javascript
function getUserById(id) {
  return { id, name: "John Doe" };
}

module.exports = { getUserById };

```

```javascript
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');

router.get('/user/:id', (req, res) => {
  const user = userService.getUserById(req.params.id);
  res.status(200).json(user);
});

module.exports = router;
```

```javascript
const request = require('supertest');
const express = require('express');
const userRouter = require('../routes/user');
const userService = require('../services/userService');

jest.mock('../services/userService'); // 👈 Mocking service

const app = express();
app.use('/api', userRouter);

describe('GET /api/user/:id', () => {
  it('should return mocked user', async () => {
    userService.getUserById.mockReturnValue({ id: '1', name: 'Mock User' });

    const res = await request(app).get('/api/user/1');

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Mock User');
  });
});

```