export const isSorted = function (arr: number[]) {
	if (arr.length <= 1) return true
	let inc = true
	let dec = true
	for (let i = 1; i < arr.length; i++) {
		if (arr[i] > arr[i - 1]) dec = false
		if (arr[i] < arr[i - 1]) inc = false
		if (!inc && !dec) return false
	}

	return true
}

export const search = function (arr: number[], v: number) {
	let start = 0
	let end = arr.length - 1
	while (start <= end) {
		let middle = (start + end) >> 1
		if (arr[middle] == v) return middle
		else if (arr[middle] > v) end = middle - 1
		else start = middle + 1
	}
	return -1
}

export const isMonotonic = function (arr: number[]) {
	let inc = true
	let dec = true
	for (let i = 1; i < arr.length; i++) {
		inc = arr[i - 1] <= arr[i] && inc
		dec = arr[i - 1] >= arr[i] && dec
	}
	return inc || dec
}

export const hasDuplicates = function <T>(arr: T[]) {
	const set = new Set<T>()
	for (const item of arr) {
		if (set.has(item)) return true
		set.add(item)
	}
	return false
}

export const swap = function <T>(arr: T[], i: number, j: number) {
	;[arr[i], arr[j]] = [arr[j], arr[i]]
}

export const subsets = function <T>(arr: T[]) {
	const res: T[][] = []
	const stack: { i: number; slate: T[] }[] = [{ i: 0, slate: [] }]
	while (stack.length > 0) {
		const { i, slate } = stack.pop()!
		if (i === arr.length) {
			res.push(slate.slice())
		} else {
			stack.push({ i: i + 1, slate })
			stack.push({
				i: i + 1,
				slate: [...slate, arr[i]]
			})
		}
	}
	return res
}

export const filterDuplicates = function <T>(arr: T[]) {
	return Array.from(new Set(arr))
}
