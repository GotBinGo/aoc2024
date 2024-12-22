import { readFileSync, writeFileSync } from 'fs';

var list = readFileSync('input21').toString().trim();
list = list.split('\n');


var task = '029A' 

var keys = { 
    'A': [2,3],
    '0': [1,3],
    '1': [0,2],
    '2': [1,2],
    '3': [2,2],
    '4': [0,1],
    '5': [1,1],
    '6': [2,1],
    '7': [0,0],
    '8': [1,0],
    '9': [2,0]
}

var keys2 = { 
    '^': [1,0],
    'A': [2,0],
    '<': [0,1],
    'v': [1,1],
    '>': [2,1]
}




function dist1(start, end) {
    return Math.abs(keys[start][0]-keys[end][0])+Math.abs(keys[start][1]-keys[end][1])+1
}

function dist2(start, end) {
    return Math.abs(keys2[start][0]-keys2[end][0])+Math.abs(keys2[start][1]-keys2[end][1])+1
}

function diff1(start, end) {
    return [keys[end][0]-keys[start][0],keys[end][1]-keys[start][1]]
}

function diff2(start, end) {
    return [keys2[end][0]-keys2[start][0],keys2[end][1]-keys2[start][1]]
}



function find1(start, end) {
    var [x,y] = diff1(start, end);
    var resX= '';
    var resY= '';

    if(x == 0 && y == 0) return ['A']

    if(x < 0) {
        resX = '<'.repeat(Math.abs(x))
    }

    if(x > 0) {
        resX = '>'.repeat(Math.abs(x))
    }

    if(y < 0) {
        resY = '^'.repeat(Math.abs(y))
    }

    if(y > 0) {
        resY = 'v'.repeat(Math.abs(y))
    }
    if(start == '0' || start == 'A') {
        if(end == '1' || end == '4' || end == '7')
            return [resY+resX+'A']
    }

    if(start == '1' || start == '4' || start == '7') {
        if(end == '0' || end == 'A')
            return [resX+resY+'A']
    }
    if(resX+resY == resY+resX) {
        return [resX+resY+'A'] 
    }
    return [resX+resY+'A', resY+resX+'A']
}



function find2(start, end) {
    var [x,y] = diff2(start, end);
    var resX= '';
    var resY= '';
    
    if(x == 0 && y == 0) return ['A']
    
    if(x < 0) {
        resX = '<'.repeat(Math.abs(x))
    }
    
    if(x > 0) {
        resX = '>'.repeat(Math.abs(x))
    }
    
    if(y < 0) {
        resY = '^'.repeat(Math.abs(y))
    }
    
    if(y > 0) {
        resY = 'v'.repeat(Math.abs(y))
    }



    if(start == '^' || start == 'A') {
        if(end == '<' )
            return [resY+resX+'A']
    }

    if(start == '<') {
        if(end == '^' || end == 'A')
            return [resX+resY+'A']
    }

    if(resX+resY == resY+resX) {
        return [resX+resY+'A'] 
    }
    return [resX+resY+'A', resY+resX+'A']
    
}

function paths(arr) {
    var sofar = [''];
    for(var i = 0; i < arr.length; i++) {
        if (arr[i].length == 1) {
            sofar = sofar.map( x=> x+arr[i][0])
        } else {
            sofar = [...sofar.map( x=> x+arr[i][0]), ...sofar.map( x=> x+arr[i][1])]    
        }
    }
    return sofar;
}

// var state1 = 'A'
function layer1(tasks) {
    var taskRes = [];
    for(var task of tasks) {

        var res = [];
        for(var i = 0; i < task.length-1; i++) {
            res[i] = find1(task[i], task[i+1])
        }
        res = paths(res);
        taskRes.push(...res);
    }
    return taskRes;
}

function layer2(tasks) {
    console.log('layer2', tasks.length)
    var taskRes = [];
    for(var task of tasks) {

        var res = [];
        for(var i = 0; i < task.length-1; i++) {
            res[i] = find2(task[i], task[i+1])
        }
        res = paths(res);
        for(var r of res) {
            taskRes.push(r);
        }
    }
    return taskRes;
}

function complexity(task) {
    task = ['A'+task]
    var res = layer1(task);


    for(var i = 0; i < 2; i ++) {
        res = res.map(x => 'A'+x)
        res = layer2(res);
    }
    return Math.min(...res.map(x => x.length))
}

function numeric(task) {
    return task.split('A').join('')
}


var res = complexity(task)
var res = numeric(task)

res = list.map(x => complexity(x)*numeric(x)).reduce((a, c) => a+c, 0)


console.log(res);
