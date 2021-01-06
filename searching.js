function indexOf(array, value) { // Linear search
  for (let i = 0; i < array.length; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function binarySearch(array, value, start, end) {
  if (start === undefined) {
    let start = 0;
  }
  if (end === undefined) {
    let end = array.length;
  }

  if (start > end) {
    return -1;
  }

  const index = Math.floor((start + end) / 2);
  const currItem = array[index];

  console.log(start, end);
  if (currItem === value) {
    return index;
  }
  else if (currItem < value) {
    return binarySearch(array, value, index + 1, end);
  }
  else if (currItem > value) {
    return binarySearch(array, value, start, index - 1);
  }
}

class _Node {
  constructor(value, next) {
    this.value = value;
    this.next = next;
  }
}

class Queue {
  constructor() {
    this.first = null;
    this.last = null;
    this.length = 0;
  }

  enqueue(data) {
    const node = new _Node(data, null);
    if (this.first === null) {
      this.first = node;
    }
    if (this.last) {
      this.last.next = node;
    }
    this.length++;
    this.last = node;
  }

  dequeue() {
    if (this.first === null) {
      return null;
    }
    const node = this.first;
    this.first = this.first.next;
    if (node === this.last) {
      this.last = null;
    }
    this.length--;
    return node;
  }
}

class BinarySearchTree {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    // If the tree is empty, the key will be inserted as the root
    if (this.key == null) {
      this.key = key;
      this.value = value;
    }

    /*  If the tree exists, start at the root and compare to the key you're inserting
        If the new key is less than the root, new key needs to live on the left side.
    */
    else if (key < this.key) {
      /* If existing node doesn't have a left child,
        insert new node as the left child with `this` as the parent.
      */
      if (this.left == null) {
        this.left = new BinarySearchTree(key, value, this);
      }
      /* If the node already has a left child, we recursively call the `insert` method
        so the node is added further down the tree.
      */
      else {
        this.left.insert(key, value);
      }
    }
    /* Similarly, if the new key is greater than the root,
      follow the same process on the right side.
    */
    else {
      if (this.right == null) {
        this.right = new BinarySearchTree(key, value, this);
      }
      else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    // If the item is found at the root then return that value
    if (this.key === key) {
      return this.value;
    }
    /* If the item is less than the root, follow the left child.
      If there is an existing left child, recursively check its children
      until you find the item.
    */
    else if (key < this.key && this.left) {
      return this.left.find(key);
    }
    /* If the item is greater than the root, follow the right child.
      If there is an existing right child, recursively check its children
      until you find the item.
    */
    else if (key > this.key && this.right) {
      return this.right.find(key);
    }
    // You have searched the tree and the item is not in the tree.
    else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      /* If the node only has a left child,
        replace the node with its left child
      */
      else if (this.left) {
        this._replaceWith(this.left);
      }
      /* If the node only has a right child,
        replace the node with its right child
      */
      else if (this.right) {
        this._replaceWith(this.right);
      }
      /* If the node has no children, simply remove it
        and any references to it by calling `this._replaceWith(null)`
      */
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

  inOrder(values = []) {
    if (this.left) {
      values = this.left.inOrder(values);
    }
    values.push(this.key);
    if (this.right) {
      values = this.right.inOrder(values);
    }
    return values;
  }

  preOrder(values = []) {
    values.push(this.key);
    if (this.left) {
      values = this.left.preOrder(values);
    }
    if (this.right) {
      values = this.right.preOrder(values);
    }
    return values;
  }

  postOrder(values = []) {
    if (this.left) {
      values = this.left.postOrder(values);
    }
    if (this.right) {
      values = this.right.postOrder(values);
    }
    values.push(this.key);
    return values;
  }

  bfs(tree, values = []) {
    const queue = new Queue();
    const node = tree;
    queue.enqueue(node);
    while (queue.length) {
      const currNode = queue.dequeue();
      values.push(currNode.value.value);

      if (currNode.value.left) {
        queue.enqueue(currNode.value.left);
      }
      if (currNode.value.right) {
        queue.enqueue(currNode.value.right);
      }
    }
    return values;
  }
}

// 1.1 To find 8, the algorithm will check 12, 6, 11, 8 and return the index of 8 which is 3.
// 1.2 To find 16, the algorithm will check 12, 17, 15 and return -1 since 16 is not part of the data.

const dataset = [89, 30, 25, 32, 72, 70, 51, 42, 25, 24, 53, 55, 78, 50, 13, 40, 48, 32, 26, 2, 14, 33, 45, 72, 56, 44, 21, 88, 27, 68, 15, 62, 93, 98, 73, 28, 16, 46, 87, 28, 65, 38, 67, 16, 85, 63, 23, 69, 64, 91, 9, 70, 81, 27, 97, 82, 6, 88, 3, 7, 46, 13, 11, 64, 76, 31, 26, 38, 28, 13, 17, 69, 90, 1, 6, 7, 64, 43, 9, 73, 80, 98, 46, 27, 22, 87, 49, 83, 6, 39, 42, 51, 54, 84, 34, 53, 78, 40, 14, 5,];
function linearSearchCounter(array, value) {
  let counter = 0;
  for (let i = 0; i < array.length; i++) {
    counter++;
    if (array[i] === value) {
      return `Linear search found item in ${counter} tries.`;
    }
  }
  return `Item not in dataset, linear search discovered this after ${counter} tries.`;
}

console.log(linearSearchCounter(dataset, 83));
console.log(linearSearchCounter(dataset, 89));
console.log(linearSearchCounter(dataset, 5));
console.log(linearSearchCounter(dataset, 42));
console.log(linearSearchCounter(dataset, 23));
console.log(linearSearchCounter(dataset, 2300));

const sortedDataset = dataset.sort((a, b) => a - b);

function binarySearchCounter(array, value, start = 0, end = array.length, counter = 0) {
  counter++;
  if (start > end || start === array.length) {
    return `Item not in dataset, binary search discovered this after ${counter} tries.`;
  }

  const index = Math.floor((start + end) / 2);
  const currItem = array[index];

  // console.log(start, end);
  if (currItem === value) {
    return `Binary search found item in ${counter} tries.`;
  }
  else if (currItem < value) {
    return binarySearchCounter(array, value, index + 1, end, counter);
  }
  else if (currItem > value) {
    return binarySearchCounter(array, value, start, index - 1, counter);
  }
}

console.log(binarySearchCounter(dataset, 83));
console.log(binarySearchCounter(dataset, 89));
console.log(binarySearchCounter(dataset, 5));
console.log(binarySearchCounter(dataset, 42));
console.log(binarySearchCounter(dataset, 23));
console.log(binarySearchCounter(dataset, 2300));

// 4.1 14, 19, 15, 27, 25, 79, 90, 91, 89, 35
// 4.2 8, 6, 5, 7, 10, 9, 11

const BST = new BinarySearchTree();
BST.insert(25);
BST.insert(15);
BST.insert(50);
BST.insert(10);
BST.insert(24);
BST.insert(35);
BST.insert(70);
BST.insert(4);
BST.insert(12);
BST.insert(18);
BST.insert(31);
BST.insert(44);
BST.insert(66);
BST.insert(90);
BST.insert(22);
console.log('In Order' + BST.inOrder());
console.log('Pre Order' + BST.preOrder());
console.log('Post Order' + BST.postOrder());

const enterprise = new BinarySearchTree();
enterprise.insert(5, 'Captain Picard');
enterprise.insert(3, 'Commander Riker');
enterprise.insert(4, 'Lt. Cmdr. LaForge');
enterprise.insert(2, 'Lt. Cmdr. Worf');
enterprise.insert(1, 'Lieutenant security-officer');
enterprise.insert(6, 'Commander Data');
enterprise.insert(8, 'Lt. Cmdr. Crusher');
enterprise.insert(7, 'Lieutenant Selar');
console.log(enterprise.bfs(enterprise));

const stockPrices = [128, 97, 121, 123, 98, 97, 105];
function maxProfit(prices) {
  function findSellIndex(start = 1, end = prices.length) {
    let maxIndex = start;
    let maxPrice = prices[maxIndex];
    for (let i = start + 1; i < end; i++) {
      let currPrice = prices[i];
      if (currPrice > maxPrice) {
        maxPrice = currPrice;
        maxIndex = i;
      }
    }
    return maxIndex;
  }
  function findBuyIndex(start = 0, end = prices.length - 1) {
    let minIndex = start;
    let minPrice = prices[minIndex];
    for (let i = 0; i < end; i++) {
      let currPrice = prices[i];
      if (currPrice < minPrice) {
        minPrice = currPrice;
        minIndex = i;
      }
    }
    return minIndex;
  }
  let buyIndex = findBuyIndex();
  let sellIndex = findSellIndex(buyIndex + 1);
  let maxProfit = prices[sellIndex] - prices[buyIndex];
  sellIndex = findSellIndex();
  buyIndex = findBuyIndex(0, sellIndex - 1);
  let currProfit = prices[sellIndex] - prices[buyIndex];
  return currProfit > maxProfit ? currProfit : maxProfit;
}

console.log('Expected 26, Actual ' + maxProfit(stockPrices));
stockPrices[5] = 1;
console.log('Expected 104, Actual ' + maxProfit(stockPrices));
