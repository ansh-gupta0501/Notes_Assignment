

// import {describe, test,it,expect} from 'jest';
import {max,calculateAverage} from '../index.js'

import { getData } from '../handler.js';     
import { jest } from '@jest/globals';


describe('max',()=>{

    it('should return the first argument if it is greater',()=>{
        const a = 2;
        const b = 1;

        const result = max(a,b)

        expect(result).toBe(2);
    })

    it('should return the second argument if it is greater',()=>{
        expect(max(1,2)).toBe(2);
    });

    it('should return the first argument if arguments are equal',()=>{
        expect(max(1,1)).toBe(1);
    });


})

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


const mockRequest = {
    body: {
        inputData: 1
    }
};

const mockResponse = {
    /*
    jest.fn() creates a mock function — it doesn’t do anything but records whether it was called, with what arguments, etc.

    You use these to spy on how getData() behaves:

    Was res.send() called?

    Was it called with the right data?

    Was res.sendStatus(400) triggered?

    */
    sendStatus : jest.fn(),
    send : jest.fn()
};

describe('getData',()=>{
    it('get User data',()=>{
        // as this getData takes two arguments req and res , so here the mock comes
        getData(mockRequest,mockResponse)

        expect(mockResponse.send).toHaveBeenCalledWith();
        // expect(mockResponse.sendStatus).not.toHaveBeenCalled();
    });


//     it('should return 400 if inputData is invalid', () => {
//     const mockRequest = {
//       body: {
//         inputData: 999 // not in mockData
//       }
//     };

//     const mockResponse = {
//       sendStatus: jest.fn(),
//       send: jest.fn()
//     };

//     getData(mockRequest, mockResponse);

//     expect(mockResponse.sendStatus).toHaveBeenCalledWith(400); //This is a Jest matcher that checks whether a mock function (like jest.fn()) was called with specific arguments.
//     expect(mockResponse.send).not.toHaveBeenCalled();  //This checks whether the mock function was not called at all.
//   });

})