const resistanceByColor = {
  black: 0,
  brown: 1,
  red: 2,
  orange: 3,
  yellow: 4,
  green: 5,
  blue: 6,
  violet: 7,
  grey: 8,
  white: 9,
}
type Color = keyof typeof resistanceByColor

export function decodedValue(
  colors: readonly [Color, Color, ...Color[]],
): number {
  const firstDigit = resistanceByColor[colors[0]]
  const secondDigit = resistanceByColor[colors[1]]
  return firstDigit * 10 + secondDigit
}
