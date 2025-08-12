export class Clock {
  /** This is always less than `minutesPerDay`. */
  #minuteWithinDay

  constructor(hour: number, minute: number = 0) {
    const minutesIncludingHours = BigInt(hour * Number(minutesPerHour) + minute)
    this.#minuteWithinDay =
      minutesIncludingHours < 0
        ? (minutesIncludingHours % minutesPerDay) + minutesPerDay
        : minutesIncludingHours % minutesPerDay
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
    return new Clock(0, Number(this.#minuteWithinDay) + minutes)
  }

  public minus(minutes: number): Clock {
    return new Clock(0, Number(this.#minuteWithinDay) - minutes)
  }

  public equals(other: Clock): boolean {
    return this.#minuteWithinDay === other.#minuteWithinDay
  }
}

const hoursPerDay = 24n
const minutesPerHour = 60n
const minutesPerDay = hoursPerDay * minutesPerHour
