
import {max,calculateAverage} from '../index.js';
import request from 'supertest'
import app from '../app.js'
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


describe('GET /api/hello',()=>{
    it('should return Hello, World',async ()=>{
        const res = await request(app).get('/api/hello');
        expect(res.statusCode).toBe(200);
        expect(res.body.message).toBe('Hello, World!');
    });
});



