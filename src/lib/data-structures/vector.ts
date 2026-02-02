export class Vector<T> {
	private _size: number = 0;
	private _capacity: number = 0;
	private buffer: T[];

	constructor(capacity: number = 4) {
		this._capacity = Math.max(1, capacity);
		this.buffer = new Array(this._capacity);
	}

	size(): number {
		return this._size;
	}

	capacity(): number {
		return this._capacity;
	}

	isEmpty(): boolean {
		return this._size === 0;
	}

	private grow() {
		this._capacity *= 2;
		const newBuf = new Array<T>(this._capacity);
		for (let i = 0; i < this._size; i++) {
			newBuf[i] = this.buffer[i];
		}
		this.buffer = newBuf;
	}

	push(value: T): void {
		if (this._size === this._capacity) {
			this.grow();
		}
		this.buffer[this._size++] = value;
	}

	pop(): T | undefined {
		if (this._size === 0) return undefined;
		const val = this.buffer[this._size - 1];
		this._size--;
		return val;
	}

	get(index: number): T {
		if (index < 0 || index >= this._size) {
			throw new RangeError("Vector: index out of range");
		}
		return this.buffer[index];
	}

	set(index: number, value: T): void {
		if (index < 0 || index >= this._size) {
			throw new RangeError("Vector: index out of range");
		}
		this.buffer[index] = value;
	}

	clear(): void {
		this._size = 0;
	}

	reserve(newCap: number): void {
		if (newCap <= this._capacity) return;
		const newBuf = new Array<T>(newCap);
		for (let i = 0; i < this._size; i++) newBuf[i] = this.buffer[i];
		this.buffer = newBuf;
		this._capacity = newCap;
	}

	resize(n: number, defaultValue: T): void {
		if (n < this._size) {
			this._size = n;
			return;
		}
		if (n > this._capacity) {
			this.reserve(n * 2);
		}
		while (this._size < n) {
			this.buffer[this._size++] = defaultValue;
		}
	}

	insert(index: number, value: T): void {
		if (index < 0 || index > this._size) {
			throw new RangeError("Vector: insert index out of range");
		}
		if (this._size === this._capacity) {
			this.grow();
		}
		for (let i = this._size; i > index; i--) {
			this.buffer[i] = this.buffer[i - 1];
		}
		this.buffer[index] = value;
		this._size++;
	}

	erase(index: number): void {
		if (index < 0 || index >= this._size) {
			throw new RangeError("Vector: erase index out of range");
		}
		for (let i = index; i < this._size - 1; i++) {
			this.buffer[i] = this.buffer[i + 1];
		}
		this._size--;
	}

	toArray(): T[] {
		return this.buffer.slice(0, this._size);
	}
}
