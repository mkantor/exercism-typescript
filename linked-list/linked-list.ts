type Node<T> = {
  previous?: Node<T>
  readonly element: T
  next?: Node<T>
}

export class LinkedList<T> {
  #last: Node<T> | undefined

  #getFirst(): Node<T> | undefined {
    if (this.#last === undefined) {
      return undefined
    } else {
      let firstNode = this.#last
      while (firstNode.previous !== undefined) {
        firstNode = firstNode.previous
      }
      return firstNode
    }
  }

  public push(element: T): void {
    const node = { element, previous: this.#last }
    if (this.#last === undefined) {
      this.#last = node
    } else {
      this.#last.next = node
      this.#last = this.#last.next
    }
  }

  public pop(): T | undefined {
    const poppedNode = this.#last
    this.#last = this.#last?.previous
    return poppedNode?.element
  }

  public shift(): T | undefined {
    const shiftedNode = this.#getFirst()
    if (shiftedNode?.next !== undefined) {
      shiftedNode.next.previous = undefined
    }
    if (shiftedNode === this.#last) {
      this.#last = undefined
    }
    return shiftedNode?.element
  }

  public unshift(element: T): void {
    const first = this.#getFirst()
    if (first === undefined) {
      this.#last = { element }
    } else {
      const node = { next: first, element }
      first.previous = node
    }
  }

  /** Deletes all nodes with the given element value (as determined by `===`). */
  // The tests aren't very precise about how `delete` should behave.
  public delete(element: T): void {
    let node: Node<T> | undefined = this.#last
    while (node !== undefined) {
      if (node.element === element) {
        if (node.previous !== undefined) {
          node.previous.next = node.next
        }
        if (node.next !== undefined) {
          node.next.previous = node.previous
        }
        if (node === this.#last) {
          this.#last = node.previous
        }
      }
      node = node.previous
    }
  }

  public count(): unknown {
    let count = 0
    let node: Node<T> | undefined = this.#last
    while (node !== undefined) {
      count++
      node = node.previous
    }
    return count
  }
}
