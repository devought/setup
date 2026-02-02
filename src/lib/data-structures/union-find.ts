export class UnionFind {
	private parent: number[]
	private rank: number[]
	private size: number[]

	constructor(n: number) {
		// by default all elements are parents for themselves
		this.parent = Array.from({ length: n }, (_, i) => i)
		// by default all elements have equal rank
		this.rank = Array(n).fill(1)
		// by default all elements contains only themselves
		this.size = Array(n).fill(1)
	}

	find(x: number) {
		if (this.parent[x] !== x) {
			this.parent[x] = this.find(this.parent[x])
		}
		return this.parent[x]
	}

	union(x: number, y: number): void {
		let parentX = this.find(x)
		let parentY = this.find(y)
		if (parentX === parentY) {
			return
		}

		if (this.rank[parentX] < this.rank[parentY]) {
			;[parentX, parentY] = [parentY, parentX]
		}

		this.parent[parentY] = parentX
		this.size[parentX] += this.size[parentY]
		if (this.rank[parentX] === this.rank[parentY]) {
			this.rank[parentX]++
		}
	}

	connected(x: number, y: number): boolean {
		return this.find(x) === this.find(y)
	}

	getSize(x: number): number {
		const parent = this.find(x)
		return this.size[parent]
	}
}
