export function isPangram(input: string): boolean {
  const uniqueLetters = new Set<string>()
  for (const character of input) {
    const lowercaseCharacter = character.toLowerCase()
    if (/[a-z]/.test(lowercaseCharacter)) {
      uniqueLetters.add(lowercaseCharacter)
    }
    if (uniqueLetters.size === 26) {
      return true
    }
  }
  return false
}
