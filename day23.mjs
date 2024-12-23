import { readFileSync, writeFileSync } from 'fs';
import pkg from 'lodash';
const {uniq} = pkg;

var list = readFileSync('input23').toString().trim();
list = list.split('\n').map(x => x.split('-'));


var all = [];
for(var i = 0; i < list.length; i++) {
    all.push(list[i][0])
    all.push(list[i][1])
}
all = uniq(all)

all.sort();





// list = list.map(x => x)

// list = list.map(x => {
//     return x;
// });

// list = list.filter(x => x)

// list = list.sort((a, b) => a-b);

// list = list.reduce((a, b) => a + b, 0);
var cd = {};
function conned(a, b) {
    if(cd[a+'-'+b]) {
        return cd[a+'-'+b];
    }

    if(cd[b+'-'+a]) {
        return cd[b+'-'+a];
    }

    var res = list.filter(x => x[0] == a && x[1] == b).length || list.filter(x => x[0] == b && x[1] == a).length
    cd[a+'-'+b] = res;
    cd[b+'-'+a] = res;
}

var res = [];
for(var i = 0; i < all.length; i++) {
    console.log(all.length, i);
    for(var j = i; j < all.length; j++) {
        for(var k = j; k < all.length; k++) {
            if(conned(all[i], all[j]) && conned(all[i], all[k]) && conned(all[j], all[k])) {
                res.push([all[i], all[j], all[k]])
            }
        }
    }
}

res = res.map(x => uniq(x)).filter(x => x.length ==3);
res = res.filter(x => x[0][0] == 't' || x[1][0] == 't' || x[2][0] == 't')
console.log(res.length)

// console.log(all);