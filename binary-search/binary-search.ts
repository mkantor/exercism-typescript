export function find(haystack: readonly number[], needle: number): number {
  let start = 0
  let end = haystack.length - 1
  while (start <= end) {
    const middleIndex = Math.floor((start + end) / 2)
    const middleElement = haystack[middleIndex]
    if (middleElement > needle) {
      // Eliminate right half of haystack.
      end = middleIndex - 1
    } else if (middleElement < needle) {
      // Eliminate left half of haystack.
      start = middleIndex + 1
    } else {
      // Found it!
      return middleIndex
    }
  }
  throw new Error('Value not in array')
}
