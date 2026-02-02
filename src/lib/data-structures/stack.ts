export class Stack<T> {
	private data: T[] = []

	push(value: T): void {
		this.data.push(value)
	}

	pop(): T | null {
		return this.data.length ? this.data.pop()! : null
	}

	peek(): T | null {
		return this.data.length ? this.data[this.data.length - 1] : null
	}

	size(): number {
		return this.data.length
	}

	isEmpty(): boolean {
		return this.data.length === 0
	}

	clear(): void {
		this.data.length = 0
	}
}
