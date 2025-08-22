const greatestCommonDivisor = (a: number, b: number): number =>
  b === 0 ? Math.abs(a) : greatestCommonDivisor(b, a % b)

export class Rational {
  readonly numerator
  readonly denominator

  constructor(numerator: number, denominator: number) {
    this.numerator = numerator
    this.denominator = denominator
  }

  add(operand: Rational): Rational {
    return new Rational(
      this.numerator * operand.denominator +
        operand.numerator * this.denominator,
      this.denominator * operand.denominator,
    ).reduce()
  }

  sub(operand: Rational): Rational {
    return this.add(new Rational(-operand.numerator, operand.denominator))
  }

  mul(operand: Rational): Rational {
    return new Rational(
      this.numerator * operand.numerator,
      this.denominator * operand.denominator,
    ).reduce()
  }

  div(operand: Rational): Rational {
    return this.mul(new Rational(operand.denominator, operand.numerator))
  }

  abs(): Rational {
    const reduced = this.reduce()
    return new Rational(Math.abs(reduced.numerator), reduced.denominator)
  }

  exprational(exponent: number): Rational {
    if (exponent >= 0) {
      return new Rational(
        this.numerator ** exponent,
        this.denominator ** exponent,
      ).reduce()
    } else {
      const positiveExponent = -exponent
      return new Rational(
        this.denominator ** positiveExponent,
        this.numerator ** positiveExponent,
      ).reduce()
    }
  }

  expreal(base: number): number {
    return base ** (this.numerator / this.denominator)
  }

  reduce(): Rational {
    const gcd = greatestCommonDivisor(this.numerator, this.denominator)
    const newNumerator = this.numerator / gcd
    const newDenominator = this.denominator / gcd
    if (newDenominator < 0) {
      return new Rational(-newNumerator, -newDenominator)
    } else {
      return new Rational(newNumerator, newDenominator)
    }
  }
}
