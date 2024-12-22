import { readFileSync, writeFileSync } from 'fs';

// var list = readFileSync('input').toString().trim();
var list = readFileSync('input22').toString().trim();
list = list.split('\n');

function mix(a, b) {
    // console.log('miiiiiiix', a, b)
    a = BigInt(a);
    b = BigInt(b);

    return a ^ b;
}

function prune(x) {
    // console.log(x)
    x = BigInt(x);
    return x % BigInt(16777216)
}

function nextOne(res) {
    res = BigInt(res);
    res = mix(res, res*BigInt(64))
    res = prune(res);
    res = mix(res, (res/BigInt(32)))
    res = prune(res);
    res = mix(res,res * BigInt(2048))
    res = prune(res);
    return Number(res);
}

function next(x, n) {
    for(var i = 0; i < n; i++) {
        x = nextOne(x);
    }
    return Number(x);
}



//task1
// var res = list.map(x => next(x, 2000)).reduce((a, c) => a+c, 0);


function gen(x, n) {
    console.log('gen', x)
    var list = [];
    for(var i = 0; i < n; i++) {
        list.push(x)
        x = nextOne(x)
    }
    list = list.map(x => x.toString().split('').slice(-1).join(''))
    var res = list.map((x, i, arr) => (arr[i])-(arr[i-1] || 0)).filter((x, i) => i > 0)

    res = res.map((x, i, arr) => {
        if(i < 3) {
            return []
        } else
        return [[arr[i-3], arr[i-2], arr[i-1], arr[i]].join(''), [arr[i-3], arr[i-2], arr[i-1], arr[i]], list[i+1]] 
        
    }).filter(x => x.length);

    var first = {};
    for(var i = 0; i < res.length; i++) {
        if(first[res[i][0]] === undefined) {
            if(res[i][0] == '1-351') {
                console.log(res[i])
            }
            first[res[i][0]] = res[i][2];
        }
    }
    
    return first;
}

function addgen(a, b) {
    for(var i of Object.keys(b)) {
        if(i == '1-351') console.log(b[i])

        a[i] = (Number(a[i]) || 0)+Number(b[i]) 
    }

    return a;
}


//task2

var ac = {};
for(var i = 0; i < list.length; i++) {
    var res = gen(list[i], 2000);
    // var res = gen(123, 10);
    // console.log(res)
    res = addgen(ac, res);
}

// res = Object.keys(res).filter((x) => res[x] == 24)
res = Math.max(...Object.keys(res).map(x => res[x]))


// res = gen(123, 2000);
// res = addgen(ac, res);



// var res = mix(42,15);
// var res = prune(100000000);



// list = list.map(x => x)

// list = list.map(x => {
//     return x;
// });

// list = list.filter(x => x)

// list = list.sort((a, b) => a-b);

// list = list.reduce((a, b) => a + b, 0);


console.log(res);