import { DoubleNode } from "..";

export class LRUCache {
	private capacity: number;
	private map = new Map<number, DoubleNode>();
	private head: DoubleNode;
	private tail: DoubleNode;
	constructor(capacity: number) {
		this.capacity = capacity;

		/* Everything will between these two nodes */
		this.head = new DoubleNode(0, 0);
		this.tail = new DoubleNode(0, 0);

		this.head.next = this.tail;
		this.tail.previous = this.head;
	}

	get(key: number) {
		if (!this.map.has(key)) {
			return -1;
		}

		let node = this.map.get(key)!;
		/* Now this node will become most recently used */
		this.moveToFront(node);
		return node.value;
	}

	put(key: number, value: number) {
		if (this.map.has(key)) {
			let node = this.map.get(key)!;
			/* Here we will rewrite the value of node with key and move to front */
			node.value = value;
			this.moveToFront(node);
		} else {
			let node = new DoubleNode(key, value);
			this.unshift(node);
			this.map.set(key, node);

			if (this.map.size > this.capacity) {
				let tail = this.popTail();
				this.map.delete(tail.key);
			}
		}
	}

	private unshift(node: DoubleNode) {
		/* we always push on front so we put the node between head and head.next */
		node.previous = this.head;
		node.next = this.head.next;

		this.head.next!.previous = node;
		this.head.next = node;
	}

	private remove(node: DoubleNode) {
		/* get the prev and next of current node and connect them */
		let prev = node.previous!;
		let next = node.next!;

		prev.next = next;
		next.previous = prev;
	}

	private moveToFront(node: DoubleNode) {
		this.remove(node); /* remove from chain */
		this.unshift(node); /* push in front */
	}

	private popTail() {
		/* Remember, we dont delete the head or tail, because they are our helpers, everything we push will be stored in between them */
		let node = this.tail.previous!;
		this.remove(node);
		return node;
	}
}
