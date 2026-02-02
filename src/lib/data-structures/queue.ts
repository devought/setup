export class Queue<T> {
	private data: T[] = []
	private head = 0

	enqueue(value: T): void {
		this.data.push(value)
	}

	dequeue(): T | null {
		if (this.isEmpty()) return null
		const value = this.data[this.head++]
		if (this.head > 50 && this.head * 2 > this.data.length) {
			this.data = this.data.slice(this.head)
			this.head = 0
		}
		return value
	}

	front(): T | null {
		return this.isEmpty() ? null : this.data[this.head]
	}

	size(): number {
		return this.data.length - this.head
	}

	isEmpty(): boolean {
		return this.size() === 0
	}

	clear(): void {
		this.data = []
		this.head = 0
	}
}
