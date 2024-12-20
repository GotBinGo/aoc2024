import { readFileSync, writeFileSync } from 'fs';

var list = readFileSync('input').toString().trim();
list = list.split('\n');






// list = list.map(x => x)

// list = list.map(x => {
//     return x;
// });

// list = list.filter(x => x)

// list = list.sort((a, b) => a-b);

// list = list.reduce((a, b) => a + b, 0);


console.log(list);