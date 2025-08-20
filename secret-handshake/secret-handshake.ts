export function commands(code: number): readonly string[] {
  const actions = [
    ...(code & 0b00001 ? ['wink'] : []),
    ...(code & 0b00010 ? ['double blink'] : []),
    ...(code & 0b00100 ? ['close your eyes'] : []),
    ...(code & 0b01000 ? ['jump'] : []),
  ]

  return code & 0b10000 ? actions.reverse() : actions
}
