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

export function decodedResistorValue(
  colors: readonly [Color, Color, Color, ...Color[]],
): string {
  const firstDigit = resistanceByColor[colors[0]]
  const secondDigit = resistanceByColor[colors[1]]
  const exponentsOfTen = resistanceByColor[colors[2]]
  const resistance =
    (firstDigit * 10 + secondDigit) * Math.pow(10, exponentsOfTen)

  return formatResistance(resistance)
}

function formatResistance(resistance: number): string {
  const formatted =
    resistance >= 1e9
      ? `${resistance / 1e9} gigaohms`
      : resistance >= 1e6
        ? `${resistance / 1e6} megaohms`
        : resistance >= 1e3
          ? `${resistance / 1e3} kiloohms`
          : `${resistance} ohms`

  return formatted
}
