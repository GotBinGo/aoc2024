import { readFileSync, writeFileSync } from 'fs';

var list = readFileSync('input1').toString().split('\n').map(x => x.split('   '));
var a = list.map(x => Number(x[0])).filter(x => x)
var b = list.map(x => Number(x[1])).filter(x => x)

a.sort()
b.sort()

// a = [1, 2, 3]
// b = [1, 2, 4]

var res = a.reduce((acc, c, i) => acc+b.filter(x => x == c).length*c, 0)
// var res = a.reduce((a, c, i) => console.log(i), 0)

console.log(res)


