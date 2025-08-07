type TwoDimensionalArray<T> = readonly (readonly T[])[]

export class Matrix {
  readonly #rows: TwoDimensionalArray<number>
  constructor(source: string) {
    this.#rows = source
      .split('\n')
      .map((rowSource) => rowSource.split(' '))
      .map((row) => row.map(Number))
  }

  get rows(): TwoDimensionalArray<number> {
    return this.#rows
  }

  get columns(): TwoDimensionalArray<number> {
    return this.#rows.reduce<TwoDimensionalArray<number>>(
      (columns, row) =>
        row.map((element, index) => [...(columns[index] ?? []), element]),
      [],
    )
  }
}
