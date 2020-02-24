class MinHeap {
  /*
  constructor() {
    this.data = [];
  }

  push(node) {
    this.data.push(node);
  }

  pop() {
    let minIndex = 0;
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].dist < this.data[minIndex].dist) minIndex = i;
    }
    const minNode = this.data.splice(minIndex, 1)[0];
    return minNode;
  }

  isEmpty() {
    return this.data.length === 0;
  }

  getNodeObject(row, col) {
    for (var i = 0; i < this.data.length; i++) {
      if (this.data[i].node[0] === row && this.data[i].node[1] === col)
        return this.data[i];
    }
    return undefined;
  }
*/
  constructor(selector) {
    this.items = [];
    this.selector = selector;
  }

  isEmpty() {
    return this.items.length === 0;
  }

  getNodeObject(row, col) {
    for (var i = 0; i < this.items.length; i++) {
      const currNode = this.items[i];
      if (currNode.node[0] === row && currNode.node[1] === col) {
        return currNode;
      }
    }
    return undefined;
  }

  seek() {
    return this.items[0];
  }
  push(item) {
    let i = this.items.length;
    this.items.push(item);
    while (
      i > 0 &&
      this.selector(this.items[Math.floor((i + 1) / 2 - 1)]) >
        this.selector(this.items[i])
    ) {
      let t = this.items[i];
      this.items[i] = this.items[Math.floor((i + 1) / 2 - 1)];
      this.items[Math.floor((i + 1) / 2 - 1)] = t;
      i = Math.floor((i + 1) / 2 - 1);
    }
  }
  pop() {
    if (this.items.length <= 1) return this.items.pop();
    const ret = this.items[0];
    this.items[0] = this.items.pop();
    let i = 0;
    while (true) {
      let lowest =
        this.selector(this.items[(i + 1) * 2]) <
        this.selector(this.items[(i + 1) * 2 - 1])
          ? (i + 1) * 2
          : (i + 1) * 2 - 1;
      if (this.selector(this.items[i]) > this.selector(this.items[lowest])) {
        let t = this.items[i];
        this.items[i] = this.items[lowest];
        this.items[lowest] = t;
        i = lowest;
      } else break;
    }
    return ret;
  }

  indexOf(item) {
    for (var i = 0; i < this.items.length; i++) {
      if (
        item.node[0] === this.items[i].node[0] &&
        item.node[1] === this.items[i].node[1]
      )
        return i;
    }
  }
  delete(item) {
    let i = this.indexOf(item);
    // heapify
    this.items[i] = this.items.pop();
    while (true) {
      let lowest =
        this.selector(this.items[(i + 1) * 2]) <
        this.selector(this.items[(i + 1) * 2 - 1])
          ? (i + 1) * 2
          : (i + 1) * 2 - 1;
      if (this.selector(this.items[i]) > this.selector(this.items[lowest])) {
        let t = this.items[i];
        this.items[i] = this.items[lowest];
        this.items[lowest] = t;
        i = lowest;
      } else break;
    }
  }
  heapify(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.push(arr[i]);
    }
  }
}
module.exports = MinHeap;
