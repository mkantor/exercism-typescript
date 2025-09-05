export function encode(plainText: string): string {
  return transcode(plainText, 5)
}

export function decode(cipherText: string): string {
  return transcode(cipherText)
}

const letters = [...'abcdefghijklmnopqrstuvwxyz']
const digits = [...'0123456789']
const mapping: Record<string, string> = Object.fromEntries(
  letters
    .flatMap((letter, index) => {
      // Letters map to the corresponding letter in a reversed alphabet (a → z, b → y, etc):
      const output = letters[letters.length - index - 1]
      return [
        [letter, output],
        [letter.toUpperCase(), output], // Uppercase letters map to lowercase outputs.
      ]
    })
    .concat(digits.map((digit) => [digit, digit])), // Digits are preserved.
)

function transcode(text: string, groupLength = Infinity): string {
  let output = ''
  let currentGroupLength = 0
  for (const character of text) {
    const transcodedCharacter = mapping[character]
    if (transcodedCharacter !== undefined) {
      if (currentGroupLength !== 0 && currentGroupLength % groupLength === 0) {
        output += ` ${transcodedCharacter}`
        currentGroupLength = 1
      } else {
        output += transcodedCharacter
        currentGroupLength += 1
      }
    }
  }
  return output
}
