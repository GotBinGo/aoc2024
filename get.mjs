import { writeFileSync } from 'fs';
import fetch from 'node-fetch';

var day = 2;

var input = await (await fetch('https://adventofcode.com/2024/day/'+day+'/input', {
    headers: {
        // cookie: ''
        // cookie: ''
        // cookie: ''
        cookie: 'session=53616c7465645f5f54e8fa79e29797cd12445f15c748324659793b76bc2f87b8802f693690392b185a7bc11bcfee80594c1e2a6ee71808fa47c655b9ab0349ef'
    }
})).text();

console.log(input.slice(0, 50));

writeFileSync('./input'+day, input);
