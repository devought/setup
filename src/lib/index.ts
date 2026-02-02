export {
	gcd,
	gcds,
	lcm,
	lcms,
	isPrime,
	generatePrimes,
	primesUntil,
	primeFactors,
	getSum,
	getSquareSum,
	getCubeSum,
	fib,
	isPowerOfTwo,
	nextPowerOfTwo,
	isPowerOfFour,
	evenSum,
	oddSum,
	countSetBits,
	pow
} from './algorithms/numbers'

export {
	isDigit,
	isLowercase,
	isUppercase,
	isLetter,
	isPalindrome,
	isAnagram,
	isPermutation,
	capitalize,
	filterDuplicates,
	unicodeSize
} from './algorithms/strings'

export {
	countOccurence,
	deepEqual,
	isPrimitive,
	sameType,
	reverseList,
	hasCycle,
	listSize
} from './algorithms/general'

export {
	isMonotonic,
	isSorted,
	search,
	hasDuplicates,
	swap,
	subsets
} from './algorithms/array'

export { Vector } from './data-structures/vector'
export { Stack } from './data-structures/stack'
export { List } from './data-structures/list'
export { Queue } from './data-structures/queue'
export { Deque } from './data-structures/deque'
export { Heap } from './data-structures/heap'
export { UnionFind } from './data-structures/union-find'
export { LRUCache } from './data-structures/lru-cache'

export const MOD = 1_000_000_007

export class ListNode {
	val: number
	next: ListNode | null

	constructor(val?: number, next?: ListNode) {
		this.val = val === undefined ? 0 : val
		this.next = next === undefined ? null : next
	}
}

export class TreeNode {
	val: number
	left: TreeNode | null
	right: TreeNode | null

	constructor(val?: number, left?: TreeNode, right?: TreeNode) {
		this.val = val === undefined ? 0 : val
		this.left = left === undefined ? null : left
		this.right = right === undefined ? null : right
	}
}

export class RandomNode {
	val: number
	next: RandomNode | null
	random: RandomNode | null

	constructor(val?: number, next?: RandomNode, random?: RandomNode) {
		this.val = val === undefined ? 0 : val
		this.next = next === undefined ? null : next
		this.random = random === undefined ? null : random
	}
}

export class GraphNode {
	val: number
	neighbors: GraphNode[]

	constructor(val?: number, neighbors?: GraphNode[]) {
		this.val = val === undefined ? 0 : val
		this.neighbors = neighbors === undefined ? [] : neighbors
	}
}

export class DoubleNode {
	key: number
	value: number
	previous: DoubleNode | null = null
	next: DoubleNode | null = null

	constructor(key: number, value: number) {
		this.key = key
		this.value = value
	}
}
