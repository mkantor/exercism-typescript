const allWhitespacePattern = /^\s*$/

const questionPattern = /\?\s*$/

// Yelling requires at least one uppercase letter and no lowercase letters. The
// message may contain other characters which fit neither of those categories.
const yellingPattern =
  /^\P{Lowercase_Letter}*\p{Uppercase_Letter}\P{Lowercase_Letter}*$/u

export function hey(message: string): unknown {
  const isSilence = allWhitespacePattern.test(message)
  if (isSilence) {
    return 'Fine. Be that way!'
  } else {
    const isQuestion = questionPattern.test(message)
    const isYelling = yellingPattern.test(message)
    if (isQuestion && isYelling) {
      return "Calm down, I know what I'm doing!"
    } else if (isYelling) {
      return 'Whoa, chill out!'
    } else if (isQuestion) {
      return 'Sure.'
    } else {
      return 'Whatever.'
    }
  }
}
