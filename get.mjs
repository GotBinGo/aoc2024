import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

var day = 20;

var input = await (await fetch('https://adventofcode.com/2024/day/'+day+'/input', {
    headers: {
        // cookie: ''
        // cookie: ''
        // cookie: ''
    }
})).text();

console.log(input.slice(0, 50));

writeFileSync('./input'+day, input);
