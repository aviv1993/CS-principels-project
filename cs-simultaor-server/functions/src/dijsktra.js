const MinHeap = require("./minHeap");
const BLOCK_NODE = 3;
const WEIGHTED_NODE = 6;
const MAX_VALUE = 30 * 20 * 30;

class DijAlgo {
  constructor(row, col, vertices, startNode, targetNode) {
    this.row = row;
    this.col = col;
    this.visited = new Set();
    this.vertices = vertices;
    this.startNode = startNode;
    this.targetNode = targetNode;
    this.output = [];
    this.memo = [...Array(this.row)].map(x => Array(this.col).fill([]));
    this.heap = new MinHeap(node => {
      return node === undefined ? undefined : node.dist;
    });
  }
  isLegalNode(row, col) {
    return row >= 0 && row < this.row && col < this.col && col >= 0;
  }

  isBlockingNode(row, col) {
    return this.vertices[row][col] === BLOCK_NODE;
  }
  isWeightedNode(row, col) {
    return this.vertices[row][col] === WEIGHTED_NODE;
  }

  init() {
    for (var i = 0; i < this.vertices.length; i++) {
      for (var j = 0; j < this.vertices[0].length; j++) {
        if (i === this.startNode[0] && j === this.startNode[1]) {
          this.heap.push({ node: [i, j], dist: 0 });
        } else if (this.vertices[i][j] !== BLOCK_NODE) {
          this.heap.push({ node: [i, j], dist: MAX_VALUE });
        }
      }
    }
  }

  getTargetPath() {
    const path = [];
    let currNode = this.targetNode;
    let prevNode = this.memo[currNode[0]][currNode[1]];
    while (
      currNode[0] !== this.startNode[0] ||
      currNode[1] !== this.startNode[1]
    ) {
      path.push(currNode.slice());
      currNode = prevNode;
      prevNode = this.memo[currNode[0]][currNode[1]];
    }
    return path;
  }
  checkNeighbour(currNode, neighNode) {
    const row = currNode.node[0];
    const col = currNode.node[1];
    const dist = currNode.dist;
    const neightRow = neighNode[0];
    const neightCol = neighNode[1];
    const nodeObj = this.heap.getNodeObject(neightRow, neightCol);
    if (nodeObj !== undefined && this.isLegalNode(neightRow, neightCol)) {
      const weight = this.isWeightedNode(neightRow, neightCol) ? 2 : 1;
      const newDist = dist + weight;
      if (newDist < nodeObj.dist) {
        this.heap.delete(nodeObj);
        nodeObj.dist = newDist;
        this.heap.push(nodeObj);
        this.memo[nodeObj.node[0]][nodeObj.node[1]] = [row, col];
      }
    }
  }
  run() {
    const output = [];
    this.init();
    while (!this.heap.isEmpty()) {
      const currNode = this.heap.pop();
      if (currNode.dist != MAX_VALUE) {
        const row = currNode.node[0];
        const col = currNode.node[1];
        this.output.push(currNode.node);
        this.checkNeighbour(currNode, [row - 1, col - 1]);
        this.checkNeighbour(currNode, [row - 1, col]);
        this.checkNeighbour(currNode, [row - 1, col + 1]);
        this.checkNeighbour(currNode, [row, col - 1]);
        this.checkNeighbour(currNode, [row, col + 1]);
        this.checkNeighbour(currNode, [row + 1, col - 1]);
        this.checkNeighbour(currNode, [row + 1, col]);
        this.checkNeighbour(currNode, [row + 1, col + 1]);
      }
    }

    const path =
      this.memo[this.targetNode[0]][this.targetNode[1]].length === 0
        ? []
        : this.getTargetPath();
    console.log(path);
    return { actions: this.output, path: path.reverse() };
  }
}

module.exports = { DijAlgo: DijAlgo };

/*
   0 1 2 3
 0 s * * *
 1 * * * * 
 2 * * W *
 3 * * * T
 */
/*
const vertices = [...Array(4)].map(x => Array(4).fill(0));
vertices[0][0] = 0;
vertices[2][2] = 6;

dij = new DijAlgo(4, 4, vertices, [0, 0], [3, 3]);
dij.run();
*/
