const BLOCK_NODE = 3;

class BfsAlgo {
  constructor(row, col, vertices, startNode, targetNode) {
    this.row = row;
    this.col = col;
    this.visited = new Set();
    this.vertices = vertices;
    this.startNode = startNode;
    this.targetNode = targetNode;
    this.output = [];
    this.memo = [...Array(this.row)].map(x => Array(this.col).fill([]));
  }

  isLegalNode(row, col) {
    return row >= 0 && row < this.row && col < this.col && col >= 0;
  }

  addSingleNeighbour(currNode, row, col, queue, level) {
    const key = row.toString() + "," + col.toString();
    if (
      this.isLegalNode(row, col) &&
      this.vertices[row][col] !== BLOCK_NODE &&
      !this.visited.has(key)
    ) {
      this.memo[row][col] = [currNode[0], currNode[1]];
      this.visited.add(key);
      queue.push([row, col]);
      this.output.push([row, col]);
      return 1;
    }
    return 0;
  }
  addAllNeighboursNodes(currNode, queue, level) {
    const row = currNode[0];
    const col = currNode[1];
    let addedNodes = 0;
    addedNodes += this.addSingleNeighbour(
      currNode,
      row - 1,
      col - 1,
      queue,
      level
    );
    addedNodes += this.addSingleNeighbour(currNode, row - 1, col, queue, level);
    addedNodes += this.addSingleNeighbour(
      currNode,
      row - 1,
      col + 1,
      queue,
      level
    );
    addedNodes += this.addSingleNeighbour(currNode, row, col - 1, queue, level);
    addedNodes += this.addSingleNeighbour(currNode, row, col + 1, queue, level);
    addedNodes += this.addSingleNeighbour(
      currNode,
      row + 1,
      col - 1,
      queue,
      level
    );
    addedNodes += this.addSingleNeighbour(currNode, row + 1, col, queue, level);
    addedNodes += this.addSingleNeighbour(
      currNode,
      row + 1,
      col + 1,
      queue,
      level
    );
    return addedNodes;
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

  run() {
    let level = 1;
    let currentNodesAmount = 1;
    let nextNodesAmount = 0;
    const queue = [this.startNode];
    //Adding startnode to level 0 :
    this.output.push(this.startNode);

    this.visited.add(
      this.startNode[0].toString + "," + this.startNode[1].toString()
    );
    while (queue.length > 0) {
      const currNode = queue.shift();
      nextNodesAmount += this.addAllNeighboursNodes(currNode, queue, level);
    }

    const path =
      this.memo[this.targetNode[0]][this.targetNode[1]].length === 0
        ? [this.startNode]
        : this.getTargetPath();
    return { actions: this.output, path: path.reverse() };
  }
}

module.exports = { BfsAlgo: BfsAlgo };
//Running example:
/*
   0 1 2 3 4 5
 0 * * * * * *
 1 B s * * * *
 2 B * * * B *
 3 * * * * * *
 */
/*
set = new Set();
set.add(2 + "," + 0);
set.add(1 + "," + 0);
set.add(2 + "," + 4);
bfs = new BfsAlgo(4, 6, set, [1, 1], []);
console.log(bfs.run());
*/
