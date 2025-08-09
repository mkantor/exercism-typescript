export class Robot {
  static nameGenerator = makeNameGenerator()

  #name

  constructor() {
    this.#name = this.#getNextName()
  }

  public get name(): string {
    return this.#name
  }

  public resetName(): void {
    this.#name = this.#getNextName()
  }

  public static releaseNames(): void {
    Robot.nameGenerator = makeNameGenerator()
  }

  #getNextName(): string {
    const possibleName = Robot.nameGenerator.next().value
    if (possibleName === undefined) {
      throw new Error('Every possible robot name is already taken')
    } else {
      return possibleName
    }
  }
}

const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const letters = [
  'A',
  'B',
  'C',
  'D',
  'E',
  'F',
  'G',
  'H',
  'I',
  'J',
  'K',
  'L',
  'M',
  'N',
  'O',
  'P',
  'Q',
  'R',
  'S',
  'T',
  'U',
  'V',
  'W',
  'X',
  'Y',
  'Z',
]

// Names are of the form "AB123".
const allPossibleNames = letters.flatMap((letter1) =>
  letters.flatMap((letter2) =>
    digits.flatMap((digit1) =>
      digits.flatMap((digit2) =>
        digits.map(
          (digit3) => `${letter1}${letter2}${digit1}${digit2}${digit3}`,
        ),
      ),
    ),
  ),
)

/**
 * The returned generator will exhaust the entire namespace without ever
 * repeating a name.
 */
function* makeNameGenerator(): Generator<string, undefined, undefined> {
  const names = shuffle(allPossibleNames)
  let currentIndex = 0

  while (currentIndex < names.length) {
    yield names[currentIndex]
    currentIndex = currentIndex + 1
  }
}

const shuffle = <T>(input: readonly T[]): readonly T[] =>
  input.reduce(
    (shuffled, _, index1) => {
      const index2 = Math.floor(Math.random() * (index1 + 1))
      // Swap elements:
      ;[shuffled[index1], shuffled[index2]] = [
        shuffled[index2],
        shuffled[index1],
      ]
      return shuffled
    },
    [...input],
  )
