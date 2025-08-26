type Node<T> = {
  previous?: Node<T>
  readonly element: T
  next?: Node<T>
}

export class LinkedList<T> {
  #last: Node<T> | undefined
  #first: Node<T> | undefined

  public push(element: T): void {
    const node = { element, previous: this.#last }
    if (this.#last === undefined) {
      this.#first = node
    } else {
      this.#last.next = node
    }
    this.#last = node
  }

  public pop(): T | undefined {
    const poppedNode = this.#last
    this.#last = this.#last?.previous
    if (this.#last === undefined) {
      this.#first = undefined
    }
    return poppedNode?.element
  }

  public shift(): T | undefined {
    const shiftedNode = this.#first
    this.#first = this.#first?.next
    if (this.#first === undefined) {
      this.#last = undefined
    }
    return shiftedNode?.element
  }

  public unshift(element: T): void {
    const node = { element, next: this.#first }
    if (this.#first === undefined) {
      this.#last = node
    } else {
      this.#first.previous = node
    }
    this.#first = node
  }

  /** Deletes all nodes with the given element value. */
  // The tests aren't precise about how `delete` should behave.
  public delete(element: T): void {
    let node: Node<T> | undefined = this.#first
    while (node !== undefined) {
      if (node.element === element) {
        if (node.previous !== undefined) {
          node.previous.next = node.next
        }
        if (node.next !== undefined) {
          node.next.previous = node.previous
        }
        if (node === this.#first) {
          this.#first = node.next
        }
        if (node === this.#last) {
          this.#last = node.previous
        }
      }
      node = node.next
    }
  }

  public count(): unknown {
    let count = 0
    let node: Node<T> | undefined = this.#first
    while (node !== undefined) {
      count++
      node = node.next
    }
    return count
  }
}
