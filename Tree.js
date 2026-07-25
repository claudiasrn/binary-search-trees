import { Node } from "./Node.js";

export class Tree {
	constructor(array) {
		this.root = this.#buildTree(array, true);
	}

	#buildTree(array, sort = false) {
		if (array.length === 0) return null;

		if (sort === true) {
			array.sort((a, b) => a - b);
			for (let i = 0; i < array.length - 1; i++) {
				if (array[i] === array[i + 1]) {
					array[i] = undefined;
				}
			}
			array = array.filter((element) => element !== undefined);
		}

		const mid = Math.round(array.length / 2 - 1);
		const node = new Node(
			array[mid],
			this.#buildTree(array.slice(0, mid)),
			this.#buildTree(array.slice(mid + 1)),
		);

		return node;
	}

	includes(value) {
		let currentNode = this.root;

		while (currentNode !== null) {
			if (currentNode.data === value) {
				return true;
			}

			if (currentNode.data < value) {
				currentNode = currentNode.right;
			} else {
				currentNode = currentNode.left;
			}
		}

		return false;
	}

	insert(value) {
		if (this.root === null) {
			this.root = new Node(value);
			return;
		}

		let currentNode = this.root;
		while (currentNode !== null) {
			if (currentNode.data === value) return;

			if (currentNode.data < value) {
				if (currentNode.right === null) {
					currentNode.right = new Node(value);
					return;
				}

				currentNode = currentNode.right;
			} else {
				if (currentNode.left === null) {
					currentNode.left = new Node(value);
					return;
				}

				currentNode = currentNode.left;
			}
		}
	}

	deleteItem(value) {
		if (this.root === null) {
			return;
		}

		let beforeNode;
		let currentNode = this.root;
		while (currentNode !== null) {
			if (currentNode.data === value) {
				if (currentNode.left === null && currentNode.right === null) {
					if (currentNode === this.root) {
						this.root = null;
						return;
					}

					if (beforeNode.left === currentNode) {
						beforeNode.left = null;
						return;
					}

					beforeNode.right = null;
					return;
				}

				if (currentNode.right === null) {
					if (currentNode === this.root) {
						this.root = currentNode.left;
						return;
					}

					if (beforeNode.right === currentNode) {
						beforeNode.right = currentNode.left;
						return;
					}

					beforeNode.left = currentNode.left;
					return;
				}

				if (currentNode.left === null) {
					if (currentNode === this.root) {
						this.root = currentNode.right;
						return;
					}

					if (beforeNode.right === currentNode) {
						beforeNode.right = currentNode.right;
						return;
					}

					beforeNode.left = currentNode.right;
					return;
				}

				let inorderPred = currentNode.right;
				let beforeNodeInorderPred = currentNode;

				while (inorderPred.left !== null) {
					beforeNodeInorderPred = inorderPred;
					inorderPred = inorderPred.left;
				}

				[currentNode.data, inorderPred.data] = [
					inorderPred.data,
					currentNode.data,
				];

				if (beforeNodeInorderPred.left === inorderPred) {
					beforeNodeInorderPred.left = inorderPred.right;
					return;
				}

				beforeNodeInorderPred.right = inorderPred.right;
				return;
			}

			if (currentNode.data < value) {
				beforeNode = currentNode;
				currentNode = currentNode.right;
			} else {
				beforeNode = currentNode;
				currentNode = currentNode.left;
			}
		}
	}

	levelOrderForEach(callback) {
		if (callback === undefined) throw new Error("A callback is required");
		if (this.root === null) return;

		let queue = [this.root];
		let node;

		while (queue.length > 0) {
			node = queue.shift();
			if (node.left !== null) {
				queue.push(node.left);
			}

			if (node.right !== null) {
				queue.push(node.right);
			}

			callback(node);
		}
	}

	inOrderForEach(callback, node = this.root) {
		if (callback === undefined) throw new Error("A callback is required");
		if (node === null) return;

		this.inOrderForEach(callback, node.left);
		callback(node);
		this.inOrderForEach(callback, node.right);
	}

	preOrderForEach(callback, node = this.root) {
		if (callback === undefined) throw new Error("A callback is required");
		if (node === null) return;

		callback(node);
		this.preOrderForEach(callback, node.left);
		this.preOrderForEach(callback, node.right);
	}

	postOrderForEach(callback, node = this.root) {
		if (callback === undefined) throw new Error("A callback is required");
		if (node === null) return;

		this.postOrderForEach(callback, node.left);
		this.postOrderForEach(callback, node.right);
		callback(node);
	}

	height(value) {
		let currentNode = this.root;

		while (currentNode !== null) {
			if (currentNode.data === value) {
				return this.#calcHeight(currentNode);
			}
			currentNode =
				currentNode.data < value ? currentNode.right : currentNode.left;
		}

		return undefined;
	}

	#calcHeight(node) {
		if (node === null) return -1;
		return (
			1 + Math.max(this.#calcHeight(node.left), this.#calcHeight(node.right))
		);
	}

	depth(value) {
		let currentNode = this.root;
		let depth = 0;

		while (currentNode !== null) {
			if (currentNode.data === value) {
				return depth;
			}

			depth++;

			currentNode =
				currentNode.data < value ? currentNode.right : currentNode.left;
		}

		return undefined;
	}

	isBalanced(node = this.root) {
		if (node === null) return true;

		let heightLeft = this.#calcHeight(node.left);
		let heightRight = this.#calcHeight(node.right);
		if (1 < heightLeft - heightRight || -1 > heightLeft - heightRight) {
			return false;
		}

		return this.isBalanced(node.left) && this.isBalanced(node.right);
	}

	rebalance() {
        if (this.root === null) return;

        let array = [];
		let stack = [this.root];

		while (stack.length > 0) {
			let node = stack.pop();
            array.push(node.data);

			if (node.left !== null) {
				stack.push(node.left);
			}

			if (node.right !== null) {
				stack.push(node.right);
			}
		}

        this.root = this.#buildTree(array, true);
    }
}
