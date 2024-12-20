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

var maxCheat = 20;

function red() {
    for(var i = 1; i < list.length-1; i++) {
        for(var j = 1; j < list[i].length-1; j++) {
            for(var k = 1; k < list.length-1; k++) {
                for(var l = 1; l < list[k].length-1; l++) {

                    if(Number.isInteger(list[k][l])) {
                        var dist = Math.abs(i-k)+Math.abs(j-l);
                        if(dist <= maxCheat && dist > 0) {
                            var nb = [list[i][j-1],list[i][j+1],list[i-1][j],list[i+1][j], list[k][l-1],list[k][l+1],list[k-1][l],list[k+1][l]].filter(x => Number.isInteger(x))
                            if(nb.length > 1 || true) {
                                
                                // var min = Math.min(...[list[i][j-1],list[i][j+1],list[i-1][j],list[i+1][j]].filter(x => Number.isInteger(x)));
                                // var max = Math.max(...[list[k][l-1],list[k][l+1],list[k-1][l],list[k+1][l]].filter(x => Number.isInteger(x)));
                                var min = list[i][j]
                                var max = list[k][l]
                                // console.log(min, max)
                                if((max-min)-dist == 76) {
                                    console.log(i, j, k, l)
                                    console.log(min, max)
                                    // list[i][j] = 'XX'
                                    // list[k][l] = 'YY'
                                    // console.log(list.map(x => x.join('\t')).join('\n'));

                                }
                                times.push((max-min)-dist);
                            }
                        }
                    }
                    
 
                }
            }
        }
    }
}

red()




times = times.filter(x => x > 0)
times.sort((a, b) => a-b)
times = times.reverse()
// times = times.map(x => 84-x)



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