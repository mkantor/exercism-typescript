// This exercise is boring, so here's an overkill implementation that's O(n)
// for an arbitrary number of rolls:
type Roller = () => bigint
const makeDiceRollerDiscardingSmallest = ({
  sides,
  rolls,
}: {
  readonly sides: bigint
  readonly rolls: bigint
}): Roller => {
  if (!(sides > 0n)) {
    throw new Error('Dice must have more than zero sides')
  } else if (!(rolls > 0n)) {
    throw new Error('Must roll more than zero times')
  } else {
    return () => {
      const rollResults = Array.from({ length: Number(rolls) }, (_) =>
        BigInt(Math.floor(Math.random() * Number(sides)) + 1),
      )
      const aggregateState = rollResults.reduce(
        (state, roll) => ({
          total: state.total + roll,
          smallestRoll:
            state.smallestRoll === 0n || roll < state.smallestRoll
              ? roll
              : state.smallestRoll,
        }),
        { total: 0n, smallestRoll: 0n },
      )
      return aggregateState.total - aggregateState.smallestRoll
    }
  }
}

export class DnDCharacter {
  static readonly #roll = makeDiceRollerDiscardingSmallest({
    sides: 6n,
    rolls: 4n,
  })

  public static generateAbilityScore(): number {
    return Number(this.#roll())
  }

  public static getModifierFor(abilityValue: number): number {
    return Math.floor((abilityValue - 10) / 2)
  }

  charisma
  constitution
  dexterity
  intelligence
  strength
  wisdom

  constructor() {
    this.strength = DnDCharacter.generateAbilityScore()
    this.dexterity = DnDCharacter.generateAbilityScore()
    this.constitution = DnDCharacter.generateAbilityScore()
    this.intelligence = DnDCharacter.generateAbilityScore()
    this.wisdom = DnDCharacter.generateAbilityScore()
    this.charisma = DnDCharacter.generateAbilityScore()
  }

  get hitpoints(): number {
    return 10 + DnDCharacter.getModifierFor(this.constitution)
  }
}
