import { ListNode } from '..'

export const sameType = function (a: any, b: any) {
	return typeof a === typeof b
}

export const isPrimitive = function (a: any) {
	const type = typeof a
	return (
		type === 'number' ||
		type === 'string' ||
		type === 'boolean' ||
		type === 'bigint' ||
		type === 'symbol' ||
		type === 'undefined' ||
		a === null
	)
}

export const deepEqual = function (a: any, b: any): boolean {
	if (a === b) return true
	if (!sameType(a, b)) return false
	if (isPrimitive(a) || isPrimitive(b)) return false
	if (a === null || b === null) return false
	if (Array.isArray(a) && Array.isArray(b)) {
		if (a.length !== b.length) return false
		for (let i = 0; i < a.length; i++) {
			if (!deepEqual(a[i], b[i])) return false
		}
		return true
	}
	if (typeof a === 'object') {
		const keysA = Object.keys(a)
		const keysB = Object.keys(b)

		if (keysA.length !== keysB.length) return false

		for (const key of keysA) {
			if (!keysB.includes(key)) return false
			if (!deepEqual(a[key], b[key])) return false
		}
		return true
	}
	return false
}

export const countOccurence = function <T>(arr: T[]) {
	const map = new Map<T, number>()
	for (let i = 0; i < arr.length; i++) {
		map.set(arr[i], (map.get(arr[i]) ?? 0) + 1)
	}
	return map
}

export const reverseList = function (head: ListNode | null) {
	let previous = null
	while (head) {
		const temp: ListNode | null = head.next
		head.next = previous
		previous = head
		head = temp
	}
	return previous
}

export const listSize = function (head: ListNode | null) {
	if (head === null) {
		return 0
	}

	let currentNode: ListNode | null = head
	let length = 0

	while (currentNode) {
		length++
		currentNode = currentNode.next
	}

	return length
}

export const hasCycle = function (head: ListNode | null) {
	if (head === null) {
		return false
	}

	let slow: ListNode = head
	let fast: ListNode | null = head

	while (fast && fast.next) {
		fast = fast.next.next
		slow = slow.next!

		if (slow === fast) {
			return true
		}
	}

	return false
}
