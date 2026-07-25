import { Tree } from "./Tree.js";

function getRandomArray() {
    let array = [];
    for (let i = 0; i < 15; i++) {
        array.push(Math.floor(Math.random() * 100));
    }
    return array;
}

const tree = new Tree(getRandomArray());

console.log(tree.isBalanced());

let levelOrder = [];
tree.levelOrderForEach((node) => levelOrder.push(node.data));
console.log(levelOrder);

let preOrder = [];
tree.preOrderForEach((node) => preOrder.push(node.data));
console.log(preOrder);

let postOrder = [];
tree.postOrderForEach((node) => postOrder.push(node.data));
console.log(postOrder);

let inOrder = [];
tree.inOrderForEach((node) => inOrder.push(node.data));
console.log(inOrder);

tree.insert(150);
tree.insert(200);
tree.insert(250);

console.log(tree.isBalanced());

tree.rebalance();

console.log(tree.isBalanced());

levelOrder = [];
tree.levelOrderForEach((node) => levelOrder.push(node.data));
console.log(levelOrder);