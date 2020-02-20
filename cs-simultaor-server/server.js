const BfsAlgoObject = require("./bfs");
const BfsAlgo = BfsAlgoObject.BfsAlgo;

const http = require("http");
const server = http.createServer(function(request, response) {
  response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  let respEnd = [];
  if (request.method == "POST") {
    var body = "";
    request.on("data", function(data) {
      body += data;
      respEnd = handleData(JSON.parse(data));
    });
    request.on("end", function() {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(JSON.stringify({ Actions: respEnd }));
    });
  }
});

const handleData = data => {
  if (data["isArray"]) {
    if (data["algo"] < algoArrayFunctions.length)
      return algoArrayFunctions[data["algo"]](data["array"]);
    else {
      return [];
    }
  } else {
    return algoGraphFunctions[data["algo"]](
      data["startNode"],
      data["targetNode"],
      data["blockingNodes"]
    );
  }
};

const swap = (array, i, j, actions) => {
  const tmpVal = array[i];
  array[i] = array[j];
  array[j] = tmpVal;
  actions.push({ action: [i, j], marked: false });
};

const port = 8080;
const host = "127.0.0.1";
server.listen(port, host);
console.log(`Listening at http://${host}:${port}`);

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
  console.log(array);
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
    i = left, //left pointer
    j = right; //right pointer
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

const bfs = (startNode, targetNode, blockingNodes) => {
  const bfs = new BfsAlgo(18, 44, blockingNodes, startNode, targetNode);
  const output = bfs.run();
  console.log(output.length);
  return output;
};

const algoArrayFunctions = [naiveSort, bubbleSort, quickSortImple];
const algoGraphFunctions = [bfs];
