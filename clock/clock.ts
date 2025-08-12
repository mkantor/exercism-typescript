export class Clock {
  /** This is always less than `minutesPerDay`. */
  #minuteWithinDay = 0n

  constructor(hours: number, minutes: number = 0) {
    this.plus(hours * Number(minutesPerHour) + minutes)
  }

  public toString(): string {
    const hourWithinDay = this.#minuteWithinDay / minutesPerHour
    const minuteWithinHour =
      this.#minuteWithinDay - hourWithinDay * minutesPerHour

    const formattedHour = String(hourWithinDay).padStart(2, '0')
    const formattedMinute = String(minuteWithinHour).padStart(2, '0')

    return `${formattedHour}:${formattedMinute}`
  }

  public plus(minutes: number): Clock {
    const minutesToAdd =
      minutes < 0
        ? (BigInt(minutes) % minutesPerDay) + minutesPerDay
        : BigInt(minutes)

    this.#minuteWithinDay =
      (this.#minuteWithinDay + minutesToAdd) % minutesPerDay

    return this
  }

  public minus(minutes: number): Clock {
    return this.plus(-minutes)
  }

  public equals(other: Clock): boolean {
    return this.#minuteWithinDay === other.#minuteWithinDay
  }
}

const hoursPerDay = 24n
const minutesPerHour = 60n
const minutesPerDay = hoursPerDay * minutesPerHour
