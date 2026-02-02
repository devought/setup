import { MOD } from '..'

export const gcd = function (a: number, b: number) {
	while (b) {
		;[a, b] = [b, a % b]
	}
	return a
}

export const lcm = function (a: number, b: number) {
	return (a * b) / gcd(a, b)
}

export const gcds = function (nums: number[]) {
	const set = new Set(nums)
	if (set.has(0)) return -1
	let divisor = 1
	for (let n of set) {
		divisor = gcd(divisor, n)
	}
	return divisor
}

export const lcms = function (nums: number[]) {
	if (nums.length === 0) return 1
	let ans = nums[0]
	for (let i = 1; i < nums.length; i++) {
		const x = nums[i]
		if (ans === 0 || x === 0) return 0
		ans = (ans / gcd(ans, x)) * x
	}
	return ans
}

export const isPrime = function (n: number) {
	if (n < 2) return false
	if (n % 2 == 0) return n == 2
	for (let i = 3; i * i <= n; i += 2) {
		if (n % i == 0) return false
	}
	return true
}

export const generatePrimes = function (n: number) {
	if (n <= 0) return []
	const ans = [2]
	for (let i = 3; ans.length < n; i += 2) {
		if (isPrime(i)) ans.push(i)
	}
	return ans
}

export const primesUntil = function (n: number) {
	if (n <= 2) return []

	const isPrime = Array(n).fill(true)

	isPrime[0] = false
	isPrime[1] = false

	for (let i = 2; i * i < n; i++) {
		if (isPrime[i]) {
			for (let j = i * i; j < n; j += i) {
				isPrime[j] = false
			}
		}
	}

	const ans: number[] = []
	for (let i = 2; i < n; i++) {
		if (isPrime[i]) {
			ans.push(i)
		}
	}
	return ans
}

export const primeFactors = function (n: number) {
	if (n < 2) {
		return []
	}

	const result: number[] = []
	while (n % 2 === 0) {
		result.push(2)
		n /= 2
	}

	for (let i = 3; i * i < n; i++) {
		while (n % i === 0) {
			result.push(i)
			n /= i
		}
	}
	if (n > 2) {
		result.push(n)
	}
	return result
}

export const getSum = function (n: number) {
	return ((n + 1) * n) >> 1
}

export const getSquareSum = function (n: number) {
	return ((n + 1) * (2 * n + 1) * n) / 6
}

export const getCubeSum = function (n: number) {
	return getSum(n) ** 2
}

export const fib = function (n: number): number {
	if (n === 0) return 0
	if (n === 1) return 1

	let f = 0
	let s = 1

	for (let i = 2; i <= n; i++) {
		;[f, s] = [s, f + s]
	}

	return s
}

export const oddSum = function (n: number) {
	return n * n
}

export const evenSum = function (n: number) {
	return n * (n + 1)
}

export const isPowerOfTwo = function (n: number) {
	return n > 0 && ((n - 1) & n) === 0
}

export const isPowerOfFour = function (n: number) {
	return isPowerOfTwo(n) && n % 3 === 0
}

export const nextPowerOfTwo = function (n: number) {
	if (n > 0 && (n & (n - 1)) === 0) return n
	let result = 1
	while (n > 0) {
		result = result << 1
		n = n >> 1
	}
	return result
}

export const countSetBits = function (a: number) {
	let bits = 0
	while (a > 0) {
		a = a & (a - 1)
		bits++
	}
	return bits
}

export const pow = function (base: number, exponent: number) {
	base %= MOD
	let res = 1
	while (exponent) {
		if (exponent & 1) res = (res * base) % MOD
		base = (base * base) % MOD
		exponent >>= 1
	}
	return res
}
