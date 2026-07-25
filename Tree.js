import { Node } from "./Node.js";

export class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }
}