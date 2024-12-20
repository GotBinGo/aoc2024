import { readFileSync, writeFileSync } from 'fs';

var list = readFileSync('input2').toString().trim();
list = list.split('\n').map(x => x.split(' '));


function safe(arr) {
    // console.log(arr)
    arr = arr.map((x, i) => (arr[i+1] || x)-x )
    arr.pop();
    
    // console.log(arr)
    if(arr.map(x => Math.abs(x)).filter(x => x > 3).length)
        return false;

    if(arr.every(x => x > 0)) return true;
    if(arr.every(x => x < 0)) return true;
    return false;
}



// list = list.map(x => safe(x))
// console.log(list)
// list = list.map(x => x.map((y, i) => safe(without(y, i))))
list = list.map(x => [...x, 1].map((y, i) => safe(without(x, i))))




console.log(list.filter(x => x.some(x => x)).length)


// console.log(list.filter(x => x).length);



function without(arr, index) {
    return (arr.slice(0, index).concat(arr.slice(index+1)))
}

// console.log(without(arr, 6));
