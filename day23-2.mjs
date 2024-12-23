import { readFileSync, writeFileSync } from 'fs';
import pkg from 'lodash';
const {uniq, maxBy} = pkg;

var list = readFileSync('input23').toString().trim();
list = list.split('\n').map(x => x.split('-'));
list = list.map(x => swapif(x));

var cons = uniq([...list.map(x => x[0]), ...list.map(x => x[1])])
cons.sort();


function swapif(a) {
    if(a[1] > 1 [0])
        return [a[1], a[0]];
    else return a;
}


var nums = {};

for(var i = 0; i < list.length; i++) {
    nums[list[i][0]] = (nums[list[i][0]] || 0) + 1
    nums[list[i][1]] = (nums[list[i][1]] || 0) + 1
}


var res = list.length

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








let MAX = cons.length, n;
  
// Stores the vertices
let store = new Array(MAX);
store.fill(0);

// Graph
// let graph = new Array(MAX);
// for(let i = 0; i < MAX; i++)
// {
//     graph[i] = new Array(MAX);
//     for(let j = 0; j < MAX; j++)
//     {
//         graph[i][j] = 0;
//     }
// }

// Degree of the vertices
let d = new Array(MAX);
d.fill(0);

// Function to check if the given set of
// vertices in store array is a clique or not
function is_clique(b)
{

    // Run a loop for all set of edges
    for (let i = 1; i < b; i++)
    {
        for (let j = i + 1; j < b; j++)

            // If any edge is missing
            if (graph[store[i]][store[j]] == 0)
                return false;
    }
    // if(b.length == 14) 
        {console.log(b)}
    return true;
}

// Function to find all the sizes
// of maximal cliques
let maxStore = null
function maxCliques(i, l)
{
    // Maximal clique size
    let max_ = 0;

    // Check if any vertices from i+1
    // can be inserted
    for (let j = i + 1; j <= n; j++) 
    {

        // Add the vertex to store
        store[l] = j;

        // If the graph is not a clique of size k then
        // it cannot be a clique by adding another edge
        if (is_clique(l + 1))
        {

            // Update max
       
            max_ = Math.max(max_, l);

            // Check if another edge can be added
            var nex = maxCliques(j, l + 1);
            max_ = Math.max(max_, nex);

        }
    }
    return max_;
}

let edges = list.map(x => [cons.indexOf(x[0]),cons.indexOf(x[1])]);
// console.log(edges)
// let size = edges.length;
// n = cons.length;

// for (let i = 0; i < size; i++)
// {
//     graph[edges[i][0]][edges[i][1]] = 1;
//     graph[edges[i][1]][edges[i][0]] = 1;
//     d[edges[i][0]]++;
//     d[edges[i][1]]++;
// }

// res = maxCliques(0, 1)



function bronKerbosch(R, P, X, graph) {
    let cliques = new Set();
    if (P.size === 0 && X.size === 0) {
        cliques.add(new Set(R));
    }
    for (let v of P) {
        let newR = new Set(R);
        newR.add(v);
        let newP = new Set([...P].filter(x => graph.get(v).has(x)));
        let newX = new Set([...X].filter(x => graph.get(v).has(x)));
        cliques = new Set([...cliques, ...bronKerbosch(newR, newP, newX, graph)]);
        P.delete(v);
        X.add(v);
    }
    return cliques;
}

// let edges = [
//     [1, 2], [2, 3], [3, 1],
//     [4, 3], [4, 1], [4, 2]
// ];
// let n = 4; // Number of nodes

// Create an adjacency list from the edges
let graph = new Map();
for (let edge of edges) {
    let [u, v] = edge;
    graph.set(u, (graph.get(u) || new Set()).add(v));
    graph.set(v, (graph.get(v) || new Set()).add(u));
}

let vertices = new Set(graph.keys());

let allCliques = bronKerbosch(new Set(), vertices, new Set(), graph);
let maxCliqueSize = Math.max(...Array.from(allCliques).map(set => set.size), -1);
var arr =([...maxBy([...allCliques], x => x.size)].map(x => cons[x]));
arr.sort()
console.log(arr.join(','))
// console.log(res)
// console.log(maxStore)
// console.log(cons)