const BLOCK_NODE = 3;

class DfsAlgo {
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

  isBlockingNode(row, col) {
    return this.vertices[row][col] === BLOCK_NODE;
  }

  dfs(prevRow, prevCol, row, col) {
    const key = row + "," + col;
    if (
      this.isLegalNode(row, col) &&
      !this.isBlockingNode(row, col) &&
      !this.visited.has(key)
    ) {
      this.memo[row][col] = [prevRow, prevCol];
      this.output.push([row, col]);
      this.visited.add(key);
      this.dfs(row, col, row - 1, col - 1);
      this.dfs(row, col, row - 1, col);
      this.dfs(row, col, row - 1, col + 1);
      this.dfs(row, col, row, col - 1);
      this.dfs(row, col, row, col + 1);
      this.dfs(row, col, row + 1, col - 1);
      this.dfs(row, col, row + 1, col);
      this.dfs(row, col, row + 1, col + 1);
    }
  }

  getTargetPath() {
    const path = [];
    let currNode = this.targetNode;
    let prevNode = this.memo[currNode[0]][currNode[1]];
    while (
      currNode[0] != this.startNode[0] ||
      currNode[1] != this.startNode[1]
    ) {
      path.push(currNode.slice());
      currNode = prevNode;
      prevNode = this.memo[currNode[0]][currNode[1]];
    }
    return path;
  }

  run() {
    this.dfs(
      this.startNode[0],
      this.startNode[1],
      this.startNode[0],
      this.startNode[1]
    );
    const path =
      this.memo[this.targetNode[0]][this.targetNode[1]].length === 0
        ? []
        : this.getTargetPath();
    this.output.push([0, 0]);
    path.push([0, 0]);
    //console.log(this.memo[0][2])
    return { actions: this.output, path: path.reverse() };
  }
}

module.exports = { DfsAlgo: DfsAlgo };

//Running example:
/*


   0 1 2 3 4 5
 0 * * * * * *
 1 * s * * t *
 2 * * * * * *
 3 * * * * * *
 */
/*
set = new Set();
set.add(2 + "," + 0);
set.add(1 + "," + 0);
set.add(2 + "," + 4);
dfs = new DfsAlgo(1, 30, [], [0, 0], [0,15]);
console.log(dfs.run()['path']);
*/
