export class Heap<T> {
	private heap: T[] = [];
	private cb: (a: T, b: T) => boolean;

	constructor(cb: (a: T, b: T) => boolean) {
		this.cb = cb;
	}

	/**
	 * @param value Новое значение
	 * @description Добавляем новый элемент в конец массива и "поднимаем" его вверх пока он не окажется на корректной позиции по приоритету.
	 * @returns Ничего не возвращает
	 */
	push(value: T) {
		this.heap.push(value);
		this.emerge(this.heap.length - 1);
	}

	/**
	 * @description Удаляем и возвращаем корень (элемент с наивысшим приоритетом). Последний элемент переносим в корень и "опускаем" его вниз, пока он не встанет на правильное место.
	 */
	pop() {
		if (this.heap.length === 0) return null;
		if (this.heap.length === 1) return this.heap.pop()!;

		const topNode = this.heap[0];
		this.heap[0] = this.heap.pop()!;
		this.sink(0);
		return topNode;
	}

	size() {
		return this.heap.length;
	}

	peek() {
		return this.isEmpty() ? null : this.heap[0];
	}

	isEmpty() {
		return this.size() === 0;
	}

	// "Опускаем" элемент вниз по куче:
	// на каждом шаге сравниваем его с детьми и меняем местами
	// с тем ребёнком, у которого приоритет выше, пока он не станет
	// больше (для max-heap) или меньше (для min-heap) обоих детей.
	private sink(index: number) {
		const { heap, cb } = this;
		const n = heap.length;

		while (true) {
			const leftCh = 2 * index + 1;
			const rightCh = 2 * index + 2;
			let candidate = index;

			// если левый ребёнок имеет приоритет выше, чем текущий кандидат
			if (leftCh < n && cb(heap[candidate], heap[leftCh])) {
				candidate = leftCh;
			}
			// если правый ребёнок имеет приоритет выше, чем текущий кандидат
			if (rightCh < n && cb(heap[candidate], heap[rightCh])) {
				candidate = rightCh;
			}

			// если ни один ребёнок не лучше — мы на правильной позиции
			if (candidate === index) break;

			this.swap(index, candidate);
			index = candidate;
		}
	}

	// "Поднимаем" элемент вверх по куче:
	// пока у узла приоритет выше, чем у его родителя, меняем их местами.
	private emerge(index: number) {
		while (index > 0) {
			const parent = Math.floor((index - 1) / 2);
			// если текущий элемент имеет приоритет выше, чем родитель
			if (this.cb(this.heap[parent], this.heap[index])) {
				this.swap(index, parent);
				index = parent;
			} else break;
		}
	}

	private swap(i: number, j: number) {
		[this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
	}
}
