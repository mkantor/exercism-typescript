export function toRna(dna: string): string {
  return dna.replace(/./g, (nucleotide) => {
    switch (nucleotide) {
      case 'G':
        return 'C'
      case 'C':
        return 'G'
      case 'T':
        return 'A'
      case 'A':
        return 'U'
      default:
        throw new Error('Invalid input DNA.')
    }
  })
}
