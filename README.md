# Binary Search Trees

A JavaScript implementation of a self-balancing Binary Search Tree (BST), built as part of The Odin Project's Full Stack JavaScript curriculum.

## Features

- **Node** class — stores a data value plus references to left and right children.
- **Tree** class — accepts an array on initialization and builds a balanced BST from it.
  - `buildTree(array)` *(private)* — sorts the array, removes duplicates, and recursively builds a balanced tree, returning the root node.
  - `insert(value)` — inserts a new value while preserving the BST property. Does nothing if the value already exists.
  - `deleteItem(value)` — removes a value from the tree, handling leaf nodes, single-child nodes, and two-child nodes (via inorder successor). Does nothing if the value isn't found.
  - `includes(value)` — returns `true`/`false` depending on whether the value exists in the tree.
  - `levelOrderForEach(callback)` — breadth-first traversal, calling `callback` on each node.
  - `inOrderForEach(callback)` / `preOrderForEach(callback)` / `postOrderForEach(callback)` — depth-first traversals.
  - `height(value)` — returns the height (longest path to a leaf, in edges) of the node containing `value`, or `undefined` if not found.
  - `depth(value)` — returns the depth (path to root, in edges) of the node containing `value`, or `undefined` if not found.
  - `isBalanced()` — checks whether every node in the tree has left/right subtree heights differing by no more than 1.
  - `rebalance()` — rebuilds the tree from its current values so that it's balanced again.

All traversal methods (`levelOrderForEach`, `inOrderForEach`, `preOrderForEach`, `postOrderForEach`) throw an `Error` if called without a callback.

## Driver script

The driver script demonstrates the full workflow:

1. Builds a BST from an array of random numbers under 100.
2. Confirms the tree is balanced.
3. Logs all elements in level, pre, post, and in order.
4. Inserts several values over 100 to unbalance the tree.
5. Confirms the tree is now unbalanced.
6. Rebalances the tree.
7. Confirms the tree is balanced again.
8. Logs all elements in level order again.

## Notes

- Duplicate values are not supported — `insert` silently ignores a value that's already present, and `buildTree` removes duplicates from the input array before building.
- Insertion and deletion operate directly on the tree's nodes rather than the original input array, keeping those operations at their expected `O(log n)` complexity for a balanced tree.