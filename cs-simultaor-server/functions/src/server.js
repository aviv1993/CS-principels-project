const BfsAlgoObject = require("./bfs");
const BfsAlgo = BfsAlgoObject.BfsAlgo;

const DfsAlgoObject = require("./dfs");
const DfsAlgo = DfsAlgoObject.DfsAlgo;

const DijAlgoObject = require("./dijsktra");
const DijAlgo = DijAlgoObject.DijAlgo;

const http = require("http");
/*
const server = http.createServer(function(request, response) {
  response.setHeader("Access-Control-Allow-Origin", request.headers.origin);
  let respEnd = [];
  if (request.method === "POST") {
    var body = "";
    request.on("data", function(data) {
      body += data;
      respEnd = handleData(JSON.parse(data));
    });
    request.on("end", function() {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(JSON.stringify(respEnd));
    });
  }
});*/

const handleData = data => {
  if (data["isArray"]) {
    if (data["algo"] < algoArrayFunctions.length)
      return algoArrayFunctions[data["algo"]](data["array"]);
    else {
      return [];
    }
  } else {
    return algoGraphFunctions[data["algo"]](
      data["row"],
      data["col"],
      data["startNode"],
      data["targetNode"],
      data["vertices"]
    );
  }
};

const swap = (array, i, j, actions) => {
  const tmpVal = array[i];
  array[i] = array[j];
  array[j] = tmpVal;
  actions.push({ action: [i, j], marked: false });
};

/////////////// Naive Sort : ///////////////////
const naiveSort = array => {
  const actions = [];
  for (let i = 0; i < array.length - 1; i++) {
    let min = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[min]) min = j;
    }
    swap(array, i, min, actions);
  }
  return actions;
};

/////////////// Bubble Sort : ///////////////////
const bubbleSort = a => {
  const actions = [];
  var swapp;
  var n = a.length - 1;
  var x = a;
  do {
    swapp = false;
    for (var i = 0; i < n; i++) {
      if (x[i] > x[i + 1]) {
        swap(x, i, i + 1, actions);
        swapp = true;
      }
    }
    n--;
  } while (swapp);
  return actions;
};

/////////////// Quick Sort : ///////////////////
const quickSortImple = array => {
  const actions = [];
  quickSort(array, 0, array.length - 1, actions);
  return actions;
};

function quickSort(items, left, right, actions) {
  var index;
  if (items.length > 1) {
    index = partition(items, left, right, actions); //index returned from partition
    if (left < index - 1) {
      //more elements on the left side of the pivot
      quickSort(items, left, index - 1, actions);
    }
    if (index < right) {
      //more elements on the right side of the pivot
      quickSort(items, index, right, actions);
    }
  }
  return items;
}

function partition(items, left, right, actions) {
  var pivot = items[Math.floor((right + left) / 2)], //middle element
    i = left, //left poleter
    j = right; //right poleter
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      swap(items, i, j, actions); //swap two elements
      i++;
      j--;
    }
  }
  return i;
}

function merge(arr, start, mid, end, output) {
  let start2 = mid + 1;
  while (start <= mid && start2 <= end) {
    // If element 1 is in right place
    if (arr[start] <= arr[start2]) {
      start++;
    } else {
      let value = arr[start2];
      let index = start2;
      // Shift all the elements between element 1
      // element 2, right by 1.
      while (index !== start) {
        swap(arr, index, index - 1, output);
        index--;
      }
      arr[start] = value;

      // Update all the poleters
      start++;
      mid++;
      start2++;
    }
  }
}

function mergeSortImple(arr, l, r, output) {
  if (l < r) {
    // Same as (l + r) / 2, but avoids overflow
    // for large l and r
    let m = Math.floor(l + (r - l) / 2);
    // Sort first and second halves
    mergeSortImple(arr, l, m, output);
    mergeSortImple(arr, m + 1, r, output);
    merge(arr, l, m, r, output);
  }
}

function mergeSort(arr) {
  const output = [];
  mergeSortImple(arr, 0, arr.length - 1, output);
  return output;
}

const bfs = (row, col, startNode, targetNode, vertices) => {
  const bfs = new BfsAlgo(row, col, vertices, startNode, targetNode);
  const output = bfs.run();
  return output;
};

const dfs = (row, col, startNode, targetNode, vertices) => {
  const dfs = new DfsAlgo(row, col, vertices, startNode, targetNode);
  const output = dfs.run();
  return output;
};

const dij = (row, col, startNode, targetNode, vertices) => {
  const dfs = new DijAlgo(row, col, vertices, startNode, targetNode);
  const output = dfs.run();
  return output;
};

const algoArrayFunctions = [naiveSort, bubbleSort, quickSortImple, mergeSort];
const algoGraphFunctions = [bfs, dfs, dij];

module.exports = { handleData };
