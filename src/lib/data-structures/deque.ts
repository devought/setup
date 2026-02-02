export class Deque<T> {
	private buffer: T[]
	private _size: number = 0
	private head: number = 0
	private tail: number = 0

	constructor(private _capacity: number = 4) {
		if (_capacity < 1) _capacity = 1
		this._capacity = _capacity
		this.buffer = new Array<T>(_capacity)
	}

	size(): number {
		return this._size
	}

	capacity(): number {
		return this._capacity
	}

	isEmpty(): boolean {
		return this._size === 0
	}

	private ensureCapacity() {
		if (this._size < this._capacity) return

		const newCap = this._capacity * 2
		const newBuf = new Array<T>(newCap)

		for (let i = 0; i < this._size; i++) {
			newBuf[i] = this.at(i)!
		}

		this.buffer = newBuf
		this._capacity = newCap
		this.head = 0
		this.tail = this._size
	}

	/* ---- push / pop ---- */

	pushFront(value: T): void {
		this.ensureCapacity()

		this.head = (this.head - 1 + this._capacity) % this._capacity
		this.buffer[this.head] = value
		this._size++
	}

	pushBack(value: T): void {
		this.ensureCapacity()

		this.buffer[this.tail] = value
		this.tail = (this.tail + 1) % this._capacity
		this._size++
	}

	popFront(): T | undefined {
		if (this._size === 0) return undefined

		const value = this.buffer[this.head]
		this.head = (this.head + 1) % this._capacity
		this._size--
		return value
	}

	popBack(): T | undefined {
		if (this._size === 0) return undefined

		this.tail = (this.tail - 1 + this._capacity) % this._capacity
		const value = this.buffer[this.tail]
		this._size--
		return value
	}

	/* ---- access ---- */

	front(): T | undefined {
		return this._size === 0 ? undefined : this.buffer[this.head]
	}

	back(): T | undefined {
		if (this._size === 0) return undefined
		const idx = (this.tail - 1 + this._capacity) % this._capacity
		return this.buffer[idx]
	}

	at(i: number): T | undefined {
		if (i < 0 || i >= this._size) return undefined
		return this.buffer[(this.head + i) % this._capacity]
	}

	clear(): void {
		this._size = 0
		this.head = 0
		this.tail = 0
	}

	/* ---- iteration ---- */
	[Symbol.iterator](): Iterator<T> {
		let i = 0
		const size = this._size
		return {
			next: () => {
				if (i >= size) return { value: undefined, done: true }
				const v = this.at(i)!
				i++
				return { value: v, done: false }
			}
		}
	}
}
