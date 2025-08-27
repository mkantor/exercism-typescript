export class BufferFullError extends Error {
  constructor() {
    super('Buffer is full')
  }
}

export class BufferEmptyError extends Error {
  constructor() {
    super('Buffer is empty')
  }
}

const empty = Symbol('empty')
type Empty = typeof empty

export default class CircularBuffer<T> {
  #storage: (Empty | T)[]
  #oldestIndex = 0
  #nextIndex = 0

  constructor(length: number) {
    this.#storage = Array.from({ length }, () => empty)
  }

  write(value: T): void {
    if (this.#storage[this.#nextIndex] !== empty) {
      throw new BufferFullError()
    } else {
      this.forceWrite(value)
    }
  }

  read(): T {
    const element = this.#storage[this.#oldestIndex]
    if (element === empty) {
      throw new BufferEmptyError()
    } else {
      this.#storage[this.#oldestIndex] = empty
      this.#oldestIndex = (this.#oldestIndex + 1) % this.#storage.length
      return element
    }
  }

  forceWrite(value: T): void {
    if (
      this.#oldestIndex === this.#nextIndex &&
      this.#storage[this.#nextIndex] !== empty
    ) {
      // Oldest will be overwritten (and no longer be the oldest).
      this.#oldestIndex = (this.#oldestIndex + 1) % this.#storage.length
    }
    this.#storage[this.#nextIndex] = value
    this.#nextIndex = (this.#nextIndex + 1) % this.#storage.length
  }

  clear(): void {
    this.#storage.fill(empty)
    this.#oldestIndex = 0
    this.#nextIndex = 0
  }
}
