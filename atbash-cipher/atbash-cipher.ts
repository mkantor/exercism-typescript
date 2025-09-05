export function encode(plainText: string): string {
  return transcode(plainText, 5)
}

export function decode(cipherText: string): string {
  return transcode(cipherText)
}

const mapping: Record<string, string> = {
  a: 'z',
  b: 'y',
  c: 'x',
  d: 'w',
  e: 'v',
  f: 'u',
  g: 't',
  h: 's',
  i: 'r',
  j: 'q',
  k: 'p',
  l: 'o',
  m: 'n',
  n: 'm',
  o: 'l',
  p: 'k',
  q: 'j',
  r: 'i',
  s: 'h',
  t: 'g',
  u: 'f',
  v: 'e',
  w: 'd',
  x: 'c',
  y: 'b',
  z: 'a',
  0: '0',
  1: '1',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
}

function transcode(text: string, groupSize = Infinity): string {
  let output = ''
  let charactersInCurrentGroup = 0
  for (const character of text) {
    const normalizedCharacter = character.toLowerCase()
    if (normalizedCharacter in mapping) {
      const transcodedCharacter = mapping[normalizedCharacter]
      if (
        charactersInCurrentGroup !== 0 &&
        charactersInCurrentGroup % groupSize === 0
      ) {
        output += ` ${transcodedCharacter}`
        charactersInCurrentGroup = 1
      } else {
        output += transcodedCharacter
        charactersInCurrentGroup += 1
      }
    }
  }
  return output
}
