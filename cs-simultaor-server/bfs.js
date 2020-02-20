class BfsAlgo {
  constructor(row, col, blockingNodes, startNode, targetNode) {
    this.row = row;
    this.col = col;
    this.visited = new Set();
    this.blockingNodes = blockingNodes;
    this.startNode = startNode;
    this.targetNode = targetNode;
    this.output = [];
  }

  isLegalNode(row, col) {
    return row >= 0 && row < this.row && col < this.col && col >= 0;
  }

  addSingleNeighbour(row, col, queue, level) {
    const key = row.toString() + "," + col.toString();
    if (
      this.isLegalNode(row, col) &&
      !this.blockingNodes.includes(key) &&
      !this.visited.has(key)
    ) {
      console.log(row);
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
    addedNodes += this.addSingleNeighbour(row - 1, col - 1, queue, level);
    addedNodes += this.addSingleNeighbour(row - 1, col, queue, level);
    addedNodes += this.addSingleNeighbour(row - 1, col + 1, queue, level);
    addedNodes += this.addSingleNeighbour(row, col - 1, queue, level);
    addedNodes += this.addSingleNeighbour(row, col + 1, queue, level);
    addedNodes += this.addSingleNeighbour(row + 1, col - 1, queue, level);
    addedNodes += this.addSingleNeighbour(row + 1, col, queue, level);
    addedNodes += this.addSingleNeighbour(row + 1, col + 1, queue, level);
    return addedNodes;
  }

  run() {
    let level = 1;
    let currentNodesAmount = 1;
    let nextNodesAmount = 0;
    const queue = [this.startNode];
    //Adding startnode to level 0 :
    this.output.push(this.startNode);
    this.output.push([]);

    this.visited.add(
      this.startNode[0].toString + "," + this.startNode[1].toString()
    );
    while (queue.length > 0) {
      const currNode = queue.shift();
      //currentNodesAmount -= 1;
      nextNodesAmount += this.addAllNeighboursNodes(currNode, queue, level);
      /*if (currentNodesAmount == 0) {
        level++;
        currentNodesAmount = nextNodesAmount;
        nextNodesAmount = 0;
        //Adding next level to output:
        this.output.push([]);
      }*/
    }
    return this.output;
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
