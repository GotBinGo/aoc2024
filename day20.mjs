import { readFileSync, writeFileSync } from 'fs';

// var original = readFileSync('input').toString().trim();
var original = readFileSync('input20').toString().trim();
var original = original.split('\n').map(x => x.split(''));
var list = []

var times = [];

function run() {
    for(var i = 0; i < list.length; i++) {
        for(var j = 0; j < list[i].length; j++) {
            if(list[i][j] == 'S')
                list[i][j] = 0
            if(list[i][j] == '.') {
                try {
                    if(Number.isInteger(list[i][j-1])) {
                        list[i][j] = list[i][j-1]+1
                    }
                } catch(e) {}
                try {
                    if(Number.isInteger(list[i][j+1])) {
                        list[i][j] = list[i][j+1]+1
                    }
                } catch(e) {}
                try {
                    if(Number.isInteger(list[i-1][j])) {
                        list[i][j] = list[i-1][j]+1
                    }
                } catch(e) {}
                try {
                    if(Number.isInteger(list[i+1][j])) {
                        list[i][j] = list[i+1][j]+1
                    }
                } catch(e) {}

            }

            if(list[i][j] == 'E') {
                if(Number.isInteger(list[i][j-1])) {
                    list[i][j] = list[i][j-1]+1
                    return list[i][j-1]+1
                }
                if(Number.isInteger(list[i][j+1])) {
                    list[i][j] = list[i][j+1]+1
                    return list[i][j+1]+1
                }
                if(Number.isInteger(list[i-1][j])) {
                    list[i][j] = list[i-1][j]+1
                    return list[i-1][j]+1
                }
                if(Number.isInteger(list[i+1][j])) {
                    list[i][j] = list[i+1][j]+1
                    return list[i+1][j]+1
                }
            }
        }
    }
}

list = JSON.parse(JSON.stringify(original));
var last = null;
while(!last) {
    last = run();
}
console.log(last)
console.log(list.map(x => x.join('\t')).join('\n'));
console.log('----------------RED-----------------')

function red() {
    for(var i = 1; i < list.length-1; i++) {
        for(var j = 1; j < list[i].length-1; j++) {
            var nb = [list[i][j-1],list[i][j+1],list[i-1][j],list[i+1][j]].filter(x => Number.isInteger(x))
            if(nb.length > 1) {

                var min = Math.min(...nb);
                var max = Math.max(...nb);
                if(max-min-2 == 20) {
                    console.log(i, j)
                }
                times.push(84-(max-min-2));
            }
        }
    }
}

red()




times = times.filter(x => x < 84)
times.sort()
times = times.map(x => 84-x)



times = times.filter(x => x >= 100)
console.log(times)

var counts = {};

for (var i = 0; i < times.length; i++) {
    counts[times[i]] = 1 + (counts[times[i]] || 0);
}
console.log(counts)
console.log(times.length)

// list = list.map(x => x)

// list = list.map(x => {
//     return x;
// });

// list = list.filter(x => x)

// list = list.sort((a, b) => a-b);

// list = list.reduce((a, b) => a + b, 0);


// console.log(list.map(x => x.join('\t')).join('\n'));
