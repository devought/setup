class ListNode<T> {
	key: number;
	value: T;
	previous: ListNode<T> | null = null;
	next: ListNode<T> | null = null;

	constructor(key: number, value: T) {
		this.key = key;
		this.value = value;
	}
}

export class List<T> {
	private head: ListNode<T> | null = null;
	private tail: ListNode<T> | null = null;
	private count: number = 0;

	constructor() {}

	/**
	 * Добавляет новый элемент в конец списка (хвост).
	 * @param key Ключ нового узла.
	 * @param value Значение нового узла.
	 */
	addTail(key: number, value: T): void {
		const newNode = new ListNode(key, value);
		if (!this.tail) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.tail.next = newNode;
			newNode.previous = this.tail;
			this.tail = newNode;
		}
		this.count++;
	}

	/**
	 * Добавляет новый элемент в начало списка (голову).
	 * @param key Ключ нового узла.
	 * @param value Значение нового узла.
	 */
	addHead(key: number, value: T): void {
		const newNode = new ListNode(key, value);
		if (!this.head) {
			this.head = newNode;
			this.tail = newNode;
		} else {
			this.head.previous = newNode;
			newNode.next = this.head;
			this.head = newNode;
		}
		this.count++;
	}

	/**
	 * Удаляет и возвращает элемент из хвоста списка.
	 * @returns Удаленный узел или null, если список пуст.
	 */
	popTail(): ListNode<T> | null {
		if (!this.tail) return null;

		const poppedNode = this.tail;
		this.tail = poppedNode.previous;

		if (this.tail) {
			this.tail.next = null;
		} else {
			this.head = null; // Список стал пустым
		}

		this.count--;
		poppedNode.previous = null; // Очищаем ссылки для удаленного узла
		return poppedNode;
	}

	/**
	 * Удаляет и возвращает элемент из головы списка.
	 * @returns Удаленный узел или null, если список пуст.
	 */
	popHead(): ListNode<T> | null {
		if (!this.head) return null;

		const poppedNode = this.head;
		this.head = poppedNode.next;

		if (this.head) {
			this.head.previous = null;
		} else {
			this.tail = null; // Список стал пустым
		}

		this.count--;
		poppedNode.next = null; // Очищаем ссылки для удаленного узла
		return poppedNode;
	}

	/**
	 * Возвращает элемент из хвоста списка без его удаления.
	 * @returns Узел хвоста или null, если список пуст.
	 */
	peekTail(): ListNode<T> | null {
		return this.tail;
	}

	/**
	 * Возвращает элемент из головы списка без его удаления.
	 * @returns Узел головы или null, если список пуст.
	 */
	peekHead(): ListNode<T> | null {
		return this.head;
	}

	/**
	 * Выполняет предоставленную функцию для каждого элемента списка.
	 * @param callbackfn Функция, принимающая value, key и ссылку на текущий список.
	 */
	forEach(callbackfn: (value: T, key: number, list: List<T>) => void): void {
		let current = this.head;
		while (current) {
			callbackfn(current.value, current.key, this);
			current = current.next;
		}
	}

	/**
	 * Преобразует список в массив значений.
	 * @returns Массив, содержащий значения всех узлов.
	 */
	toArray(): T[] {
		const result: T[] = [];
		this.forEach((value) => result.push(value));
		return result;
	}

	/**
	 * Проверяет, содержит ли список указанное значение.
	 * @param value Искомое значение.
	 * @returns true, если значение найдено, иначе false.
	 */
	includes(value: T): boolean {
		let current = this.head;
		while (current) {
			if (current.value === value) return true;
			current = current.next;
		}
		return false;
	}

	/**
	 * Создает новый список с результатами вызова предоставленной функции для каждого элемента.
	 * @param callbackfn Функция преобразования (value, key).
	 * @returns Новый список с преобразованными значениями.
	 */
	map<U>(callbackfn: (value: T, key: number) => U): List<U> {
		const newList = new List<U>();
		this.forEach((value, key) => {
			newList.addTail(key, callbackfn(value, key));
		});
		return newList;
	}

	/**
	 * Применяет функцию-редьюсер к каждому элементу списка, сводя их к одному результирующему значению.
	 * @param callbackfn Функция-редьюсер.
	 * @param initialValue Начальное значение аккумулятора.
	 * @returns Окончательное накопленное значение.
	 */
	reduce<U>(
		callbackfn: (
			previousValue: U,
			currentValue: T,
			currentIndex: number,
		) => U,
		initialValue: U,
	): U {
		let accumulator = initialValue;
		let index = 0;
		this.forEach((value) => {
			accumulator = callbackfn(accumulator, value, index++);
		});
		return accumulator;
	}

	/**
	 * Создает новый список, содержащий только те элементы, для которых предоставленная функция вернула true.
	 * @param callbackfn Функция-предикат (value, key).
	 * @returns Новый список отфильтрованных элементов.
	 */
	filter(callbackfn: (value: T, key: number) => boolean): List<T> {
		const newList = new List<T>();
		this.forEach((value, key) => {
			if (callbackfn(value, key)) {
				// Используем исходный ключ для нового списка
				newList.addTail(key, value);
			}
		});
		return newList;
	}

	/**
	 * Меняет порядок элементов в списке на противоположный (мутирует текущий список).
	 */
	reverse(): void {
		let current = this.head;
		let temp: ListNode<T> | null = null;

		// Меняем местами next и previous для каждого узла
		while (current) {
			temp = current.previous;
			current.previous = current.next;
			current.next = temp;
			current = current.previous; // Двигаемся к следующему (который был предыдущим)
		}

		// Меняем местами head и tail списка
		temp = this.head;
		this.head = this.tail;
		this.tail = temp;
	}

	/**
	 * Создает поверхностную копию списка.
	 * @returns Новый экземпляр списка с теми же элементами.
	 */
	copy(): List<T> {
		const newList = new List<T>();
		this.forEach((value, key) => {
			newList.addTail(key, value);
		});
		return newList;
	}

	/**
	 * Возвращает текущее количество элементов в списке.
	 * @returns Размер списка.
	 */
	size(): number {
		return this.count;
	}
}
