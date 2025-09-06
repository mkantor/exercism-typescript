const alphabet = [...'abcdefghijklmnopqrstuvwxyz']
const codesByLetter = Object.fromEntries(
  alphabet.map((letter, index) => [letter, index]),
)

export class SimpleCipher {
  static #defaultKeyLength = 128
  readonly key

  constructor(key?: string) {
    this.key =
      key ??
      // Generate a random default key:
      Array.from(
        { length: SimpleCipher.#defaultKeyLength },
        (_) => alphabet[Math.floor(Math.random() * alphabet.length)],
      ).join('')
  }

  encode(plainText: string): string {
    return this.#translate(plainText, 1)
  }

  decode(cipherText: string): string {
    return this.#translate(cipherText, -1)
  }

  #translate(input: string, direction: 1 | -1): string {
    let output = ''
    for (let index = 0; index < input.length; index++) {
      const inputLetter = input[index]
      const inputCode = codesByLetter[inputLetter]
      if (inputCode === undefined) {
        // If an input character isn't a letter, leave it alone:
        output += inputLetter
      } else {
        const keyLetter = this.key[index % this.key.length]
        // If one of the key's characters is not a letter, treat it like "a":
        const keyCode = codesByLetter[keyLetter] ?? 0
        const possiblyOutOfBoundsOutputCode = inputCode + keyCode * direction
        const outputCode =
          (alphabet.length + possiblyOutOfBoundsOutputCode) % alphabet.length
        output += alphabet[outputCode]
      }
    }
    return output
  }
}
